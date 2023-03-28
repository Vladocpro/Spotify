import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {SidebarIcons} from "../sidebar/IconInterface";
import Song from "./Song";



const Songs = () => {
   const playlist = useSelector((state : RootState) => state.global.currentPlaylist)
   const currentTab = useSelector((state : RootState) => state.global.iconActive)

   useEffect(() => {
      console.log(playlist)
   }, []);


   return (
       <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
          {playlist?.tracks?.items.map((track : any, i :number) => (
              <div key={track.id} className="text-white">
                 <Song key={track.track?.id} track={track} order={i}/>
              </div>
          ))}
       </div>
   );
};

export default Songs;
