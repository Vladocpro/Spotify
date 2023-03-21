import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Song from "./Song";



const Songs = () => {
   const playlist = useSelector((state : RootState) => state.global.currentPlaylist)


   return (
       <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
          {playlist?.tracks?.items.map((track : any, i :number) => (
              <div key={track.id} className="text-white">
                 <Song key={track.track.id} track={track} order={i}/>
              </div>
          ))}
       </div>
   );
};

export default Songs;
