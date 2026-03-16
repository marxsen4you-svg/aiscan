"use client";

import { motion } from "framer-motion";

const plans = [
    {
        name: "Free",
        price: "$0",
        sub: "One-time audit",
        features: [
            "1 AI Discoverability Audit",
            "Full 5-dimension score breakdown",
            "3 priority recommended fixes",
            "Shareable report link",
        ],
        cta: "Start Free Audit",
        href: "/audit",
        popular: false,
    },
    {
        name: "Pro",
        price: "$29",
        sub: "per month",
        features: [
            "Unlimited audits",
            "Competitor comparisons",
            "Downloadable PDF reports",
            "Weekly re-scan alerts",
            "Score trend tracking",
            "Priority email support",
        ],
        cta: "Get Pro",
        href: "/pricing#pro",
        popular: true,
    },
    {
        name: "Agency",
        price: "$99",
        sub: "per month",
        features: [
            "Everything in Pro",
            "White-label branded reports",
            "Multi-domain dashboard",
            "API access",
            "Bulk audit imports",
            "Client auto-reporting",
        ],
        cta: "Get Agency",
        href: "/pricing#agency",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="py-28 section-divider relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="badge mb-6">Pricing</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl md:text-4xl tracking-tight text-text mb-4">
                        Start Free. Scale When Ready.
                    </motion.h2>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-muted text-base">No credit card for free tier. Cancel anytime on paid.</motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 ${plan.popular
                                    ? "border-2"
                                    : "glass-card"
                                }`}
                            style={plan.popular ? {
                                background: "linear-gradient(135deg, rgba(0,229,160,0.08), rgba(79,172,254,0.08))",
                                border: "2px solid rgba(0,229,160,0.3)",
                                boxShadow: "0 0 40px rgba(0,229,160,0.08), 0 8px 48px rgba(0,0,0,0.4)",
                            } : {}}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                    style={{ background: "linear-gradient(135deg, #00E5A0, #4FACFE)", color: "#050810" }}>
                                    Most Popular
                                </div>
                            )}

                            <div>
                                <div className="text-sm font-medium text-muted mb-2">{plan.name}</div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-display font-bold text-4xl tracking-tight text-text">{plan.price}</span>
                                    <span className="text-sm text-muted">{plan.sub}</span>
                                </div>
                            </div>

                            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                            <ul className="space-y-3 flex-1">
                                {plan.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-text/80">
                                        <span className="mt-0.5 shrink-0 text-accent text-base leading-none">✓</span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href={plan.href}
                                className={`w-full py-3.5 rounded-xl font-display font-semibold text-sm text-center transition-all duration-200 ${plan.popular ? "btn-primary justify-center" : "btn-secondary justify-center"
                                    }`}
                            >
                                {plan.cta}
                            </a>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-xs text-muted mt-8 font-mono">
                    All plans include the core AI Discoverability scoring engine.
                </p>
            </div>
        </section>
    );
}
