"use client";

import { motion } from "framer-motion";

const steps = [
    { num: "01", title: "Enter Your URL", desc: "No signup. Just paste your website URL and hit scan." },
    { num: "02", title: "We Analyze Live", desc: "169+ AI signals checked in real-time against 5 scoring dimensions." },
    { num: "03", title: "Get Your Score", desc: "Instant AI Visibility Score from 0–100 with a full breakdown." },
    { num: "04", title: "Fix & Monitor", desc: "Follow the priority action list. Upgrade to track changes weekly." },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-28 relative overflow-hidden"
            style={{ background: "rgba(8,13,26,0.5)" }}>

            <div className="absolute inset-0 pointer-events-none section-divider" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="badge mb-6">How It Works</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl md:text-4xl tracking-tight text-text">
                        Scan. Score. Fix. Grow.
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
                        style={{ background: "linear-gradient(90deg, rgba(0,229,160,0.2), rgba(79,172,254,0.2), rgba(0,229,160,0.2))" }} />

                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-sm mb-5 relative z-10"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(79,172,254,0.15))",
                                        border: "1px solid rgba(0,229,160,0.25)",
                                        color: "#00E5A0",
                                        boxShadow: "0 0 20px rgba(0,229,160,0.08)",
                                    }}>
                                    {step.num}
                                </div>
                                <h3 className="font-display font-semibold text-base text-text mb-2">{step.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex justify-center mt-12">
                    <a href="#audit" className="btn-primary px-8 py-3.5">
                        Start Free Audit →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
