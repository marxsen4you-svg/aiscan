import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { getUserProfile, upsertUserProfile } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { plan } = await req.json() as { plan: "pro" | "agency" };
        const planConfig = PLANS[plan];
        if (!planConfig || !planConfig.priceId) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        // Get or create Stripe customer
        let profile = await getUserProfile(userId);
        let customerId = profile?.stripe_customer_id;

        if (!customerId) {
            const customer = await stripe.customers.create({
                metadata: { clerk_user_id: userId },
            });
            customerId = customer.id;
            await upsertUserProfile({ clerk_user_id: userId, stripe_customer_id: customerId, plan: "free", audits_this_month: 0, email: "" });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: planConfig.priceId, quantity: 1 }],
            success_url: `${appUrl}/dashboard?upgraded=true`,
            cancel_url: `${appUrl}/pricing`,
            metadata: { clerk_user_id: userId, plan },
            allow_promotion_codes: true,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("[checkout]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
