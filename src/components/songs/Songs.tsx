import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {SidebarIcons} from "../sidebar/IconInterface";
import Song from "./Song";
import Show from "./Show";



const Songs = () => {
   const playlist = useSelector((state : RootState) => state.global.currentPlaylist)


   useEffect(() => {
      console.log(playlist)
   }, []);


   return (
       <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
          {playlist?.tracks?.items.map((track : any, i :number) => (
              <div key={track.id} className={`text-white ${playlist?.name === SidebarIcons.PODCASTS.title && "h-[200px]"}`}>
                 {playlist?.name === SidebarIcons.PODCASTS.title
                     ? <Show key={track.track?.id} track={track} order={i}/>
                     : <Song key={track.track?.id} track={track} order={i}/>
                 }
               </div>
          ))}
       </div>
   );
};

export default Songs;
