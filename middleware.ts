import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
 publicRoutes: [ 
  "/api/assistant/create", 
  "/api/thread", 
  "/api/message/create", 
  "/api/message/list",
  "/api/run/create",
  "/api/run/retrieve",
  "/api/challenge-users",
  "/api/openai",
  "/api/send-notifications",

],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};