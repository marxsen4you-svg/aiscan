import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    typescript: true,
});

export const PLANS = {
    free: {
        name: "Free",
        price: 0,
        priceId: null,
        auditsPerMonth: 1,
        features: ["1 audit", "Full score breakdown", "3 recommended fixes", "Shareable report"],
    },
    pro: {
        name: "Pro",
        price: 29,
        priceId: process.env.STRIPE_PRICE_PRO_MONTHLY!,
        auditsPerMonth: -1, // unlimited
        features: ["Unlimited audits", "Competitor comparisons", "PDF reports", "Weekly alerts", "Score history"],
    },
    agency: {
        name: "Agency",
        price: 99,
        priceId: process.env.STRIPE_PRICE_AGENCY_MONTHLY!,
        auditsPerMonth: -1,
        features: ["Everything in Pro", "White-label reports", "Multi-domain dashboard", "API access", "Bulk imports"],
    },
} as const;

export type PlanKey = keyof typeof PLANS;
