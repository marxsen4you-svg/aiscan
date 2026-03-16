"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScorePreview } from "./ScorePreview";
import { useCountUp } from "@/hooks/useCountUp";

function StatPill({ end, suffix = "", label, duration = 2000 }: {
    end: number; suffix?: string; label: string; duration?: number;
}) {
    const { count, ref } = useCountUp(end, duration);
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center px-2">
            <div className="font-display font-bold text-xl text-gradient">{count.toLocaleString()}{suffix}</div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mt-0.5">{label}</div>
        </div>
    );
}

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function Hero() {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = url.trim();
        if (!trimmed) { setError("Please enter your website URL"); return; }
        const clean = trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "");
        router.push(`/audit?url=${encodeURIComponent(clean)}`);
    };

    return (
        <section id="audit" className="relative flex flex-col justify-center overflow-hidden pt-12 pb-24 min-h-[90vh]">

            {/* Subtle background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }} />
                <div className="absolute top-0 left-1/4 w-[700px] h-[500px]"
                    style={{ background: "radial-gradient(circle, rgba(79,172,254,0.1), transparent 65%)", filter: "blur(80px)" }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px]"
                    style={{ background: "radial-gradient(circle, rgba(0,214,143,0.08), transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div className="flex flex-col items-start">

                        <Fade delay={0.05}>
                            <div className="badge mb-7">
                                <span className="live-dot" />
                                AI Discoverability Audit · Free · 60 Seconds
                            </div>
                        </Fade>

                        <Fade delay={0.12}>
                            <h1 className="font-display font-bold text-text mb-5"
                                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
                                Will AI Recommend<br />
                                <span className="text-gradient">Your Business?</span>
                            </h1>
                        </Fade>

                        <Fade delay={0.18}>
                            <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
                                ChatGPT, Perplexity, and Gemini now control who gets discovered.
                                Most businesses are completely invisible. Find out where you stand in 60 seconds — free.
                            </p>
                        </Fade>

                        {/* Clean URL input */}
                        <Fade delay={0.24} className="w-full max-w-lg">
                            <form onSubmit={handleSubmit} className="mb-3">
                                <div
                                    className="flex items-stretch rounded-xl overflow-hidden transition-all duration-200"
                                    style={{
                                        border: `1.5px solid ${focused ? "rgba(0,214,143,0.55)" : "rgba(255,255,255,0.13)"}`,
                                        boxShadow: focused ? "0 0 0 3px rgba(0,214,143,0.1)" : "none",
                                        background: "#1C2A45",
                                    }}
                                >
                                    {/* Prefix */}
                                    <div className="flex items-center px-4 shrink-0"
                                        style={{ borderRight: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}>
                                        <span className="text-muted text-sm font-mono">https://</span>
                                    </div>

                                    {/* Input */}
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => { setUrl(e.target.value); setError(""); }}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        placeholder="yourbusiness.com"
                                        autoComplete="off"
                                        spellCheck={false}
                                        className="flex-1 bg-transparent py-4 px-4 text-text text-sm outline-none min-w-0"
                                    />

                                    {/* CTA */}
                                    <button type="submit"
                                        className="shrink-0 m-1.5 px-5 rounded-lg font-display font-semibold text-sm whitespace-nowrap transition-all hover:brightness-110"
                                        style={{ background: "linear-gradient(135deg, #00D68F, #00BFFF)", color: "#0F1629" }}>
                                        Scan Free →
                                    </button>
                                </div>
                                {error && <p className="mt-2 text-xs text-danger">{error}</p>}
                            </form>

                            {/* Trust pills */}
                            <div className="flex items-center gap-5 text-xs text-muted">
                                {["No account needed", "No credit card", "~60 second results"].map((t) => (
                                    <span key={t} className="flex items-center gap-1.5">
                                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6l3 3 5-5" stroke="#00D68F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Fade>

                        {/* Stats strip */}
                        <Fade delay={0.32} className="w-full max-w-lg mt-10">
                            <div className="rounded-xl px-6 py-4 flex items-center justify-between"
                                style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                                <StatPill end={12400} suffix="+" label="Audits Run" />
                                <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.09)" }} />
                                <StatPill end={94} suffix="%" label="Accuracy" />
                                <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.09)" }} />
                                <StatPill end={169} suffix="+" label="Signals" />
                            </div>
                        </Fade>
                    </div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                        className="hidden lg:block"
                    >
                        <ScorePreview />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
