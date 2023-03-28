import React, {FC} from 'react';
import {IconType, SidebarIcons} from "./IconInterface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setCurrentPlaylist, setIconActive} from "../../redux/slices/globalSlice";
import {fetchLikedSongs} from "../../../lib/playerHandler";
interface SidebarIconItemProps {
   iconInfo: IconType
}

const SidebarIconItem: FC<SidebarIconItemProps> = ({iconInfo}) => {

   const activeItemTitle = useSelector((state : RootState) => state.global.iconActive)
   const dispatch = useDispatch()
   const fetchData = async () => {
      const data = await fetchLikedSongs();
      console.log(data)
      if(iconInfo.title === SidebarIcons.HEART.title) dispatch(setCurrentPlaylist(data))
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
