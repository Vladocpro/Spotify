import React, {useEffect} from 'react';
import {getProviders, signIn, useSession} from "next-auth/react";

const Login = ({providers} : any) => {

   return (
       <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
          <img src="../../assets/loginPage/spotify.png" alt="" className="w-52 mb-5"/>
          {Object.values(providers).map((provider : any) => (
              <div key={provider.name}>
                 <button
                     className="bg-[#18D860] text-white p-5 rounded-full"
                     onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                 >
                    Login with {provider.name}
                 </button>
              </div>
          ))}
       </div>
   );
};

export default Login;

export async function getServerSideProps() {
   const providers = await getProviders();
   return {
      props: {
         providers
      }
   }
}
