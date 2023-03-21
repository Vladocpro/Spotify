import spotifyApi from "./spotify";


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
