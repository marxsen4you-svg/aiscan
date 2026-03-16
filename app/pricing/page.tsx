"use client";

import { useState } from "react";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function PricingPage() {
    const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

    return (
        <div className="flex flex-col min-h-screen bg-bg">
            <Nav />

            {/* Hero */}
            <section className="pt-24 pb-12 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
                        Simple, Transparent Pricing.
                    </h1>
                    <p className="text-muted text-lg max-w-lg mx-auto mb-10">
                        Start free. Upgrade when you&apos;re ready to own AI search for your business.
                    </p>
                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-1 bg-surface border border-border rounded-full p-1.5 font-mono text-sm max-w-[280px] mx-auto w-full">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={`flex-1 py-2 rounded-full font-bold transition-all border ${billing === "monthly" ? "bg-surface2 text-text shadow-sm border-border" : "border-transparent text-muted hover:text-text"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("annual")}
                            className={`flex-1 py-2 rounded-full font-bold transition-all border ${billing === "annual" ? "bg-surface2 text-text shadow-sm border-border" : "border-transparent text-muted hover:text-text"}`}
                        >
                            Annually <span className="text-accent text-xs">-20%</span>
                        </button>
                    </div>
                </div>
            </section>

            <Pricing />

            {/* Checkout/Contact section — anchored from plan CTAs */}
            <section id="pro" className="py-24 bg-surface border-t border-border scroll-mt-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <div className="font-mono text-accent text-sm mb-3">Get Started</div>
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4" id="agency">
                            Ready to Upgrade?
                        </h2>
                        <p className="text-muted text-lg max-w-xl mx-auto">
                            Select your plan and enter your email to get started. We&apos;ll send you a setup link within minutes.
                        </p>
                    </div>

                    <div className="bg-surface2 border border-border rounded-2xl p-8 md:p-12 shadow-xl">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-mono text-xs text-muted mb-2 uppercase tracking-widest">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Smith"
                                        className="w-full bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded py-3 px-4 font-sans text-sm text-text outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-mono text-xs text-muted mb-2 uppercase tracking-widest">Business Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="jane@yourbusiness.com"
                                        className="w-full bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded py-3 px-4 font-sans text-sm text-text outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-mono text-xs text-muted mb-2 uppercase tracking-widest">Plan</label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {["Pro — $29/mo", "Agency — $99/mo"].map((plan) => (
                                        <label key={plan} className="flex items-center gap-3 p-4 bg-bg border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                                            <input type="radio" name="plan" value={plan} defaultChecked={plan.startsWith("Pro")} className="accent-[#00FFB2]" />
                                            <span className="font-mono text-sm text-text">{plan}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-mono text-xs text-muted mb-2 uppercase tracking-widest">Website URL (optional)</label>
                                <input
                                    type="url"
                                    placeholder="https://yourbusiness.com"
                                    className="w-full bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded py-3 px-4 font-mono text-sm text-text outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-accent hover:brightness-110 text-bg py-4 rounded font-bold font-sans text-lg transition-all shadow-[0_0_30px_rgba(0,255,178,0.2)]"
                            >
                                Get Access Now &rarr;
                            </button>

                            <p className="text-center font-mono text-xs text-muted">
                                No credit card stored until confirmed · Cancel anytime · 14-day money-back guarantee
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            <FAQ />
            <Footer />
        </div>
    );
}
