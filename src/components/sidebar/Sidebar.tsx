import React, {useEffect, useState} from 'react';
import SidebarIconItem from "./SidebarIconItem";
import { SidebarIcons} from "./IconInterface";
import {signOut, useSession} from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setActivePlaylist} from "../../redux/slices/globalSlice";




const Sidebar = () => {
   const spotifyApi = useSpotify();
   const {data: session, status} = useSession();
   const [playlists, setPlaylists] = useState([]);
   const playlistActiveId = useSelector((state : RootState) => state.global.playlistActive);

   const dispatch = useDispatch();

   useEffect(() => {
         if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data : any) => {
               setPlaylists(data.body.items)
            })
         }
   },[session, spotifyApi])


   return (
       <div
           className="text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll
           scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36"
       >
          <div className="space-y-4">
             <SidebarIconItem iconInfo={SidebarIcons.HOME}/>
             <SidebarIconItem iconInfo={SidebarIcons.SEARCH}/>
             <SidebarIconItem iconInfo={SidebarIcons.LIBRARY}/>
             <hr className="border-t-[0.1px] border-[#B3B3B3]"/>
             <SidebarIconItem iconInfo={SidebarIcons.PLUS}/>
             <SidebarIconItem iconInfo={SidebarIcons.HEART}/>
             <SidebarIconItem iconInfo={SidebarIcons.PODCASTS}/>
             <hr className="border-t-[0.1px] border-[#B3B3B3]"/>
             {playlists.map((playlist : any) => (
                 <p
                     className={`cursor-pointer ${playlist.id === playlistActiveId ? "text-white" : "text-gray-400"} hover:text-white transition-colors 0.4s ease-in`}
                     key={playlist.id}
                     onClick={() => dispatch(setActivePlaylist(playlist.id))}
                 >
                    {playlist.name}
                 </p>
             ))}
          </div>

       </div>
   );
};

export default Sidebar;
