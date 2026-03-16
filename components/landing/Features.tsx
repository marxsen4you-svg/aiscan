"use client";

import { motion } from "framer-motion";

export function Features() {
    const features = [
        { title: "Real-Time Tracking", desc: "Monitor your AI Visibility Score continuously as assistants evolve." },
        { title: "Shareable Reports", desc: "Generate client-ready PDFs with one click to use as a powerful sales tool." },
        { title: "Competitor Analysis", desc: "Benchmark your entity clarity against the top 3 players in your locale." },
        { title: "Actionable Fixes", desc: "Get prioritized, step-by-step instructions on updating schema and citations." },
        { title: "API Integration", desc: "Programmatically run audits for hundreds of locations automatically." },
        { title: "Multi-location Support", desc: "Manage an entire enterprise or franchise network from a single dashboard." },
    ];

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-text mb-6">
                        Everything You Need to Own AI Search
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="p-6 bg-bg border border-border rounded-lg hover:border-accent/40 shadow-sm transition-colors group"
                        >
                            <div className="font-mono text-accent text-sm mb-3">0{i + 1}</div>
                            <h3 className="font-bold text-lg mb-2 text-text group-hover:text-accent transition-colors">{f.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
