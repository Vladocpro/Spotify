import spotifyApi from "./spotify";
import {log} from "util";
import {SidebarIcons} from "../src/components/sidebar/IconInterface";


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
   const episodes = await fetch(
       `https://api.spotify.com/v1/me/episodes`,
       {
          headers: {
             Authorization: `Bearer ${spotifyApi.getAccessToken()}`
          }
       }
   ).then((res: Response )=> res.json())
   return [devices, episodes];
}

export const fetchLikedSongs =  async ()  => {
   try {
      let likedSongs = await fetch(
          `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
          {
             headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`
             }
          }
      ).then((res: Response) => res.json())
      likedSongs.images = [{url: "../../../assets/mainContent/likedSongs.png"}];
      likedSongs.name = SidebarIcons.HEART.title;
      likedSongs.tracks = {items: []}
      likedSongs.tracks.items = [...likedSongs.items]
      return likedSongs;

   } catch (e) {

   }

}
