import React, {useCallback, useEffect, useState} from 'react';
import useSpotify from "../../../hooks/useSpotify";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
// import useSongInfo from "../../../hooks/useSongInfo";
import {useSession} from "next-auth/react";
import {setCurrentSong, setSongIsPlaying} from "../../redux/slices/globalSlice";
import {fetchAvailableDevices} from "../../../lib/playerHandler";
import {EventType} from "next-auth";
import {debounce} from "lodash";

const Player = () => {
   const spotifyApi = useSpotify()
   const {data: session, status} = useSession();
   const songIsPlaying = useSelector((state : RootState) => state.global.songIsPlaying);
   const currentSong = useSelector((state : RootState) => state.global.currentSong);
   const dispatch = useDispatch();
   const [volume, setVolume] = useState<number>(50);

   const fetchCurrentSong = () => {
      if(!songIsPlaying) {
         spotifyApi.getMyCurrentPlayingTrack().then((data : Response) => {
            // @ts-ignore
            dispatch(setCurrentSong(data.body?.item));

            spotifyApi.getMyCurrentPlaybackState().then((data: Response) => {
               dispatch(setSongIsPlaying(data.body?.is_playing))
            })
         })
      }
   }

   const getBackgroundSize = () => {
      return {
         backgroundSize: `${(volume * 100) / 100}% 100%`,
      };
   };

   const debouncedAdjustVolume = useCallback(
       debounce((volume) => {
          spotifyApi.setVolume(volume).catch((err : Error) => {})
       }, 200),[]);

   useEffect(() => {
      if(volume > 0 && volume < 100) {
         debouncedAdjustVolume(volume);
      }
   }, [volume]);


   useEffect(() => {
         if(spotifyApi.getAccessToken() && !currentSong) {
            fetchCurrentSong();
            setVolume(50);
         }
   }, [currentSong, spotifyApi, session]);

   // useEffect(() => {
   // }, []);

   const handlePlaySong = async () => {
      const isActive = await fetchAvailableDevices();
      if (!isActive) {
         alert("No active spotify sessions");
         return;
      }
      spotifyApi.getMyCurrentPlaybackState().then((data: Response) => {
         if(data.body?.is_playing) {
            spotifyApi.pause();
            dispatch(setSongIsPlaying(false))
         } else {
            spotifyApi.play();
            dispatch(setSongIsPlaying(true))
         }
      })
   }


   return (
       <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
          <div className="flex items-center space-x-4">
             <img className="hidden md:inline h-16 w-16" src={currentSong?.album?.images?.[0]?.url} alt=""/>
             <div>
                <h3>{currentSong?.name}</h3>
                <p>{currentSong?.artists?.[0]?.name}</p>
             </div>
          </div>

          <div className="flex items-center justify-evenly">
             <img src="../../assets/player/shuffle.png" className="playerButton" alt=""/>
             <img src="../../assets/player/backward.png" className="playerButton" alt=""/>
             {
                songIsPlaying
                    ? <img src="../../assets/player/pause.png" onClick={handlePlaySong} className="playerButton h-7 w-7" alt=""/>
                    : <img src="../../assets/player/play.png" onClick={handlePlaySong} className="playerButton h-7 w-7" alt=""/>
             }

             <img src="../../assets/player/forward.png" className="playerButton" alt=""/>
             <img src="../../assets/player/repeat.png" className="playerButton" alt=""/>

          </div>
          <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
             <img src="../../assets/player/volume.png" className="h-5 w-6" alt=""/>
             <input className="w-14 md:w-28" type="range" value={volume} onChange={(e : Event) => setVolume(Number(e.target?.value))} style={getBackgroundSize()} min={0} max={100}/>
          </div>
       </div>
   );
};

export default Player;
