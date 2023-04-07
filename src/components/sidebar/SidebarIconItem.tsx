import React, {FC} from 'react';
import {IconType, SidebarIcons} from "./IconInterface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCurrentPlaylist, setIconActive} from "../../redux/slices/globalSlice";
import {fetchLikedSongs, fetchPodcasts} from "../../../lib/playerHandler";
interface SidebarIconItemProps {
   iconInfo: IconType
}

const SidebarIconItem: FC<SidebarIconItemProps> = ({iconInfo}) => {

   const activeItemTitle = useSelector((state : RootState) => state.global.iconActive)
   const dispatch = useDispatch()
   const fetchData = async () => {
      switch (iconInfo.title) {
         case SidebarIcons.HEART.title: {
            const likedSongs : any = await fetchLikedSongs();
            dispatch(setCurrentPlaylist(likedSongs))
            break;
         }
         case SidebarIcons.PODCASTS.title: {
            const podcasts : any = await fetchPodcasts();
            console.log(podcasts)
            dispatch(setCurrentPlaylist(podcasts))
            break
         }
         default: {

         }
      }
   }

   return (
       <button className="flex items-center space-x-2 hover:text-white transition-colors 0.4s ease-in" onClick={() => {
          dispatch(setIconActive(iconInfo.title))
          fetchData()
       }}>
          <img src={activeItemTitle === iconInfo.title ? iconInfo.iconActive : iconInfo.icon} alt="" className="h-5 w-5"/>
          <p style={activeItemTitle === iconInfo.title ? {color :"white"} : {}}>{iconInfo.title}</p>
       </button>
   );
};

export default SidebarIconItem;
