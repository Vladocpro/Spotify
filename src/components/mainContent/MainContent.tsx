import React, {useEffect, useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import {shuffle} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import useSpotify from "../../../hooks/useSpotify";
import {setCurrentPlaylist} from "../../redux/slices/globalSlice";
import Songs from "../songs/Songs";

const colorsForGradient  = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];


const MainContent = () => {
   const {data: session} = useSession();
   const [color, setColor] = useState<string | null>(null);
   const currentPlaylist = useSelector((state : RootState) => state.global.currentPlaylist);
   const playlistActiveId = useSelector((state : RootState) => state.global.playlistActive);
   const spotifyApi = useSpotify();
   const dispatch = useDispatch();

   useEffect(() => {
      const randomNumber = Math.floor(Math.random() * colorsForGradient.length)
      setColor(colorsForGradient[randomNumber])
   }, [currentPlaylist]);

   useEffect(() => {
      if (playlistActiveId !== null) {
         spotifyApi.getPlaylist(playlistActiveId).then((data : any[]) => {
            // @ts-ignore
            dispatch(setCurrentPlaylist(data.body))
         }).catch((err : Error) => console.log(err))
      }
   }, [spotifyApi, playlistActiveId]);

   return (
       <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
         <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={() => signOut()}>
               <img src={session?.user?.image ? session.user.image : "../../../assets/mainContent/user.png"} alt="" className="rounded-full w-10 h-10"/>
               <h2>{session?.user?.name}</h2>
               <img src="../../../assets/mainContent/arrowDown.png" alt="" className="w-3 h-3 mt-1"/>
            </div>
         </header>

          {currentPlaylist !== null ? (
              <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                 <img src={currentPlaylist?.images?.[0].url} className="h-44 w-44 shadow-2xl" style={{border: 0}} alt=""/>
                 <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                       {currentPlaylist.name}
                    </h1>
                 </div>
              </section>
          ) : (<div className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}></div>)}

          <div>
             <Songs/>
          </div>
       </div>
   );
};

export default MainContent;
