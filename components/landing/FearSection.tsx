"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "68%", label: "of AI answers recommend only 1–3 brands", color: "#FF5252" },
    { value: "0%", label: "of new businesses appear in AI by default", color: "#FFB020" },
    { value: "$2.1T", label: "of commerce will flow through AI by 2026", color: "#4FACFE" },
];

export function FearSection() {
    return (
        <section className="py-28 section-divider relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,82,82,0.15), transparent)" }} />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="badge mb-6" style={{ background: "rgba(255,82,82,0.08)", borderColor: "rgba(255,82,82,0.2)", color: "#FF5252" }}
                    >
                        The AI Search Problem
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl md:text-5xl tracking-tight text-text mb-4"
                    >
                        If AI Can&apos;t Recommend You,<br />
                        <span className="text-gradient">You Don&apos;t Exist.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-muted text-lg max-w-2xl mx-auto"
                    >
                        The shift from Google to AI assistants is the biggest search disruption in 20 years.
                        Most businesses don&apos;t know they&apos;re losing.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-8 text-center"
                            style={{ borderColor: `${stat.color}20` }}
                        >
                            <div
                                className="font-display font-bold text-5xl md:text-6xl mb-4 tracking-tight"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </div>
                            <p className="text-muted text-sm leading-relaxed">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <a href="#audit" className="btn-secondary text-sm gap-2">
                        Check My AI Visibility Score →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
