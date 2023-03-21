import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MainContent from "../components/mainContent/MainContent";
import {getSession} from "next-auth/react";
import Player from "../components/player/Player";


export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
         <Sidebar/>
         <MainContent/>
      </main>

       <div className="sticky bottom-0">
         <Player/>
       </div>
    </div>
  )
}

export async function getServeSideProps(context : any) {
   const session = await getSession(context);

   return {
      props: {
         session
      }
   }
}
