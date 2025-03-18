import { clerkMiddleware } from '@clerk/nextjs/server'
 
export default clerkMiddleware({
  publicRoutes: ["/", "/bikes", "/bikes/(.*)", "/api/(.*)"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};