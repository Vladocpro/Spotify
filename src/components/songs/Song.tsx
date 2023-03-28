import React, {FC} from 'react';
import useSpotify from "../../../hooks/useSpotify";
import {millisToMinutesAndSeconds} from "../../../lib/time";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCurrentSong, setSongIsPlaying} from "../../redux/slices/globalSlice";
import {fetchAvailableDevices} from "../../../lib/playerHandler";

interface SongProps {
      track: any,
      order: number
}


const Song : FC<SongProps> = ({track, order})  => {
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
           className="grid grid-cols-2 text-gray-400 py-3 pl-3 pr-4 hover:bg-gray-900 hover:text-white transition-all ease-in 0.4s rounded-lg cursor-pointer max-h-20"
           key={order}
           onClick={playSong}
       >
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-4">
                {(() => {
                   if(songIsPlaying) {
                      if(currentSong?.name === track?.track?.name)
                         return (
                             <div className="w-6 h-5 flex justify-end">
                                <img src="../../assets/spotifySound.gif" className="w-4 h-5" alt=""/>
                             </div>
                         )
                      else
                         return (<p className="w-6 text-right">{order + 1}</p>)

                   } else {
                      return (<p className={`w-6 text-right ${currentSong?.name === track?.track?.name ? "text-[#1ED754]" : ""}`}>{order + 1}</p>)
                   }
                   // return null;
                })()}
                <img className="h-10 w-10" src={track?.track?.album?.images?.[0]?.url} alt=""/>
             </div>

             <div>
                <p className={`w-36 lg:w-64 truncate ${currentSong?.name === track?.track?.name ? "text-[#1ED754]" : "text-white"}`}>{track?.track?.name}</p>
                <p className="w-40 ">{track?.track?.artists[0].name}</p>
             </div>
          </div>

          <div className="flex items-center justify-between ml-auto md:ml-0">
             <p className="md:w-40  hidden md:inline lg:w-80 truncate">{track?.track?.album.name}</p>
             <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
          </div>
       </div>
   );
};

export default Song;
