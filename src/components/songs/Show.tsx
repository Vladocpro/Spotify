import React, {FC} from 'react';
import {millisToMinutesAndSeconds, showTimeConvert} from "../../../lib/time";
import useSpotify from "../../../hooks/useSpotify";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {fetchAvailableDevices} from "../../../lib/playerHandler";
import {setCurrentSong, setSongIsPlaying} from "../../redux/slices/globalSlice";

interface ShowProps {
   track: any,
   order: number
}

const Show:FC<ShowProps> = ({track, order}) => {

   const spotifyApi = useSpotify();
   const currentSong = useSelector((state : RootState) => state.global.currentSong);
   const songIsPlaying = useSelector((state : RootState) => state.global.songIsPlaying);
   const dispatch = useDispatch();
   // console.log("rerender " + order)
   const playSong = async () => {
      const isActive = await fetchAvailableDevices();
      if (!isActive) {
         alert("No active spotify sessions");
         return;
      }
      dispatch(setCurrentSong(track.track));
      dispatch(setSongIsPlaying(true))
      spotifyApi.play({
         uris: [track.track.uri]
      })
   }


   return (
       <div
           className="text-gray-400 h-[190px] max-w-[40rem] lg:max-w-[70rem] py-3 pl-3 pr-4  hover:bg-gray-900 hover:text-white transition-all ease-in 0.4s rounded-lg"
           key={order}
       >
          <div className="flex items-center  space-x-4">
             <div className="flex items-center space-x-4">
                <img className="h-[112px] w-[112px] max-w-none" src={track?.track?.album ? track?.track?.album?.images?.[0]?.url : track?.track?.images[0]?.url} alt=""/>
             </div>


             <div className=" items-center justify-between ml-auto md:ml-0">
                <p className={`max-w-[50%] lg:max-w-[100%] font-bold truncate ${currentSong?.name === track?.track?.name ? "text-[#1ED754]" : "text-white"}`} >{track?.track?.name}</p>
                <p className="md:w-40 hidden text-white text-sm font-bold md:inline lg:w-80 truncate">{track?.track?.show.name}</p>
                <p  className="max-w-[20rem] md:max-w-[30rem] lg:max-w-[65rem] mt-4 mb-5 line-clamp-2">{track?.track?.description}</p>
                <div className="flex space-x-8 items-center">
                   {
                      songIsPlaying && currentSong.name === track.track.name
                          ? <img src="../../assets/player/pause.png" onClick={playSong} className="playerButton h-8 w-8" alt=""/>
                          : <img src="../../assets/player/play.png" onClick={playSong} className="playerButton h-8 w-8" alt=""/>
                   }
                   {/*{millisToMinutesAndSeconds(track?.track?.duration_ms)}*/}
                   <p>{showTimeConvert(track.track.release_date, track.track.duration_ms)}</p>
                </div>
             </div>
          </div>


       </div>
   );
};

export default Show;
