import spotifyApi from "./spotify";
import {log} from "util";
import {SidebarIcons} from "../src/components/sidebar/IconInterface";
import {setCurrentPlaylist} from "../src/redux/slices/globalSlice";


export const fetchAvailableDevices =  async ()  => {
   const devices = await fetch(
       `https://api.spotify.com/v1/me/player/devices`,
       {
          headers: {
             Authorization: `Bearer ${spotifyApi.getAccessToken()}`
          }
       }
   ).then((res: Response )=> res.json())
   if(devices.devices.some((x : any) => x.is_active === true)) return true
   return false
}



export const fetchSessionData =  async ()  => {
   const devices = await fetch(
       `https://api.spotify.com/v1/me/player`,
       {
          headers: {
             Authorization: `Bearer ${spotifyApi.getAccessToken()}`
          }
       }
   ).then((res: Response )=> res.json())

   return [devices];
}

export const fetchLikedSongs =  async ()  => {
   try {
      let data = await fetch(
          `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
          {
             headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`
             }
          }
      ).then((res: Response) => res.json())
      let likedSongs = {
         images: [{url: "../../../assets/mainContent/likedSongs.png"}],
         name:  SidebarIcons.HEART.title,
         tracks:  {items: [...data.items]}
      };

      // while (data.next) {
      // if(data.next) {
      //    data = await fetch(
      //        data.next,
      //        {
      //           headers: {
      //              Authorization: `Bearer ${spotifyApi.getAccessToken()}`
      //           }
      //        }
      //    ).then((res: Response) => res.json())
      //
      //    likedSongs.tracks.items = [...likedSongs.tracks.items,...data.items]
      // }
      // }
      return likedSongs;

   } catch (e) {

   }
}


export const fetchPodcasts =  async ()  => {
   try {
      let data = await fetch(
          `https://api.spotify.com/v1/me/episodes`,
          {
             headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`
             }
          }
      ).then((res: Response )=> res.json())
      data.items.forEach((item : any) => {
         item.track = item.episode
      })
      let podcasts = {
         images: [{url: "../../../assets/mainContent/savedEpisodes.png"}],
         name:  SidebarIcons.PODCASTS.title,
         tracks:  {items: [...data.items]}
      };
      return podcasts;

   } catch (e) {

   }
}




