import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { upsertUserProfile } from "@/lib/db";
import type Stripe from "stripe";

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error("[webhook] Invalid signature:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const clerkUserId = session.metadata?.clerk_user_id;
                const plan = session.metadata?.plan as "pro" | "agency";
                if (clerkUserId && plan) {
                    await upsertUserProfile({
                        clerk_user_id: clerkUserId,
                        plan,
                        stripe_customer_id: session.customer as string,
                        stripe_subscription_id: session.subscription as string,
                        subscription_status: "active",
                        audits_this_month: 0,
                        email: session.customer_details?.email || "",
                    });
                }
                break;
            }

            case "customer.subscription.updated": {
                const sub = event.data.object as Stripe.Subscription;
                const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
                const clerkUserId = customer.metadata?.clerk_user_id;
                if (clerkUserId) {
                    const status = sub.status as "active" | "canceled" | "past_due" | "trialing";
                    await upsertUserProfile({ clerk_user_id: clerkUserId, subscription_status: status, audits_this_month: 0, email: "" });
                }
                break;
            }

            case "customer.subscription.deleted": {
                const sub = event.data.object as Stripe.Subscription;
                const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
                const clerkUserId = customer.metadata?.clerk_user_id;
                if (clerkUserId) {
                    await upsertUserProfile({
                        clerk_user_id: clerkUserId,
                        plan: "free",
                        stripe_subscription_id: null,
                        subscription_status: "canceled",
                        audits_this_month: 0,
                        email: "",
                    });
                }
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer;
                const clerkUserId = customer.metadata?.clerk_user_id;
                if (clerkUserId) {
                    await upsertUserProfile({ clerk_user_id: clerkUserId, subscription_status: "past_due", audits_this_month: 0, email: "" });
                }
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("[webhook] handler error:", err);
        return NextResponse.json({ error: "Handler error" }, { status: 500 });
    }
}
