import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";
export const config = {
   matcher: "/",
};
export async function middleware(req : NextRequest) {

   let url = req.nextUrl.clone()
   const token = await getToken({req, secret: process.env.JWT_SECRET});
   const { pathname } = req.nextUrl;

   if(pathname.includes('/api/auth') || token) {
      return NextResponse.next()
   }

   if(!token && pathname !== '/login') {
      url.pathname = '/login'
      return NextResponse.redirect(url)
   }

}
