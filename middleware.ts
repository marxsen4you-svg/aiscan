import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    // Routes accessible without signing in
    publicRoutes: [
        "/",
        "/audit",
        "/results/(.*)",
        "/pricing",
        "/agencies",
        "/privacy",
        "/terms",
        "/sign-in(.*)",
        "/sign-up(.*)",
        "/api/stripe/webhook",  // Stripe webhooks must be public
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
