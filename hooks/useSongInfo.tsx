// import React, {useEffect, useState} from 'react';
// import useSpotify from "./useSpotify";
// import {useSelector} from "react-redux";
// import {RootState} from "../src/redux/store";
//
// const useSongInfo = () => {
//    const spotifyApi = useSpotify()
//    const songActiveId = useSelector((state : RootState) => state.global.currentSong?.id)
//    const [songInfo, setSongInfo] = useState(null);
//    console.log(songActiveId)
//
//    useEffect(() => {
//       const fetchSongInfo = async () => {
//          if(songActiveId) {
//             const trackInfo = await fetch(
//                 `https://api.spotify.com/v1/tracks/${songActiveId}`,
//                 {
//                    headers: {
//                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
//                    }
//                 }
//             ).then((res )=> res.json())
//
//             setSongInfo(trackInfo)
//          }
//       }
//
//       fetchSongInfo()
//    }, [songActiveId, spotifyApi]);
//
//
//    return songInfo;
// };
//
// export default useSongInfo;
