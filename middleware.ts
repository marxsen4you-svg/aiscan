import { authMiddleware } from "@clerk/nextjs";

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
    matcher: ["/((?!.+\\.[\\w]+$)|_next).*", "/", "/(api|trpc)(.*)"],
};
