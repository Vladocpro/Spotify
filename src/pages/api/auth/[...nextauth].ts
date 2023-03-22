import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, {LOGIN_URL} from "../../../../lib/spotify"
import {store} from "../../../redux/store";

async function refreshAccessToken(token : any) {
   // console.log(token)
   try {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);

      const {body: refreshedToken} = await spotifyApi.refreshAccessToken()
      return {
         ...token,
         accessToken: refreshedToken.access_token,
         accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
         refreshToken: refreshedToken.refresh_token ?? token.refreshToken
      }
   } catch (error) {
      return {
         ...token,
         error: "RefreshTokenAccessError"
      }
   }
}
export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      SpotifyProvider({
         // @ts-ignore
         clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
         // @ts-ignore
         clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
         authorization: LOGIN_URL
      }),
      // ...add more providers here
   ],
   secret: process.env.JWT_SECRET,
   pages: {
      signIn: '/login'
   },
   callbacks: {
      async jwt({token, account, user} : any){
         // initial sign in
         if(account && user) {
            return {
               ...token,
               accessToken: account.access_token,
               refreshToken: account.refresh_token,
               username: account.providerAccountId,
               accessTokenExpires: account.expires_at * 1000
            }
         }
         // return previous token if the access token has not expired
         if(Date.now() < token.accessTokenExpires) {
            return token;
         }
         // access token has expired, so we need to refresh it
         return await refreshAccessToken(token)

      },
      async session({session, token} : any) {
         // console.log("SESSION" + JSON.stringify(session, null, 4))
         // console.log("TOKEN" + JSON.stringify(token, null, 4))
         session.user.accessToken = token.accessToken;
         session.user.refreshToken = token.refreshToken;
         session.user.username = token.username;
         if(token.error) {
            session.error = token.error;
         }
         return session;
      }
   },
}
export default NextAuth(authOptions)
