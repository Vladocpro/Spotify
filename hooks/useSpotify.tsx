import React, {useEffect} from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import spotifyApi from "../lib/spotify";
// import SpotifyWebApi from "spotify-web-api-node";



// const spotifyApi = new SpotifyWebApi({
//    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
// })
const useSpotify = () => {

   const {data: session, status} = useSession();
   useEffect(() => {
      if(session) {
         // @ts-ignore
         if(session?.error == "RefreshTokenAccessError") {
            signIn();
         } else {
            // @ts-ignore
            spotifyApi.setAccessToken(session.user.accessToken);
         }

      }
   }, [session]);


   return spotifyApi;
};

export default useSpotify;
