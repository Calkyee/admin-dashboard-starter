import { withAuth } from 'next-auth/middleware'; 

export default withAuth({ 
  callbacks: { 
    authorized: ({token, req})=>{ 
      const pathname = req.nextUrl.pathname; 
      if(pathname.startsWith("/api/admins") || pathname.startsWith("/admin")){ 
        return !!token && (token as any).role === 'admin'; 
      }
      return !!token; 
    }
  }
}); 


export const config = {
  matcher: [ 
    "/admins/:path*", 
    "/create/:path*",
    "/users/:path*",
    "/api/auth/getAdmins/:path*", 
    "/api/auth/createAdmins/:path*",
  ]
}

