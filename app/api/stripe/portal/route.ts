import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profile = await getUserProfile(userId);
    if (!profile?.stripe_subscription_id) {
        return NextResponse.json({ error: "No active subscription" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id!,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
}
