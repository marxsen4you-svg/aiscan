"use client";

import { motion } from "framer-motion";

const steps = [
    { id: "01", title: "Entity Analyzer", desc: "Scrapes your homepage and generates the exact AI Summary your brand currently produces. Vague entity = low score.", icon: "◈" },
    { id: "02", title: "Schema Detector", desc: "Checks for LocalBusiness, Product, Service, and FAQ schema. Missing any triggers an immediate AI penalty.", icon: "◉" },
    { id: "03", title: "AI Query Tester", desc: "Runs 20 real queries across AI platforms. You see exactly how often — and how — your brand gets cited.", icon: "◎" },
    { id: "04", title: "Authority Signals", desc: "Validates your GBP completeness, review velocity, local backlinks, and location page quality.", icon: "◍" },
];

export function SolutionSection() {
    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(79,172,254,0.04), transparent 60%)" }} />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="badge mb-6">Four-Layer Analysis</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl md:text-5xl tracking-tight text-text mb-4">
                        One Scan. Four Analyses.<br />
                        <span className="text-gradient">One Score.</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.12 }}
                        className="text-muted text-lg max-w-xl mx-auto">
                        We do the work so you don&apos;t have to guess what&apos;s wrong.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Steps grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {steps.map((step, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="glass-card rounded-2xl p-6 hover:border-accent/20 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-mono text-xs text-muted">{step.id}</span>
                                    <span className="text-accent text-lg">{step.icon}</span>
                                </div>
                                <h3 className="font-display font-semibold text-base text-text mb-2 group-hover:text-gradient transition-all">{step.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Terminal visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(5,8,16,0.9)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(8,13,26,0.8)" }}>
                            <div className="w-2.5 h-2.5 rounded-full bg-danger/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-warn/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                            <span className="ml-3 text-[10px] font-mono text-muted">terminal — entity-analyzer.js</span>
                        </div>

                        <div className="p-6 font-mono text-sm space-y-3">
                            <div className="text-muted">{">"} <span className="text-accent2">const</span> <span className="text-accent">entity</span> = await <span className="text-accent2">analyze</span>(&apos;mybusiness.com&apos;)</div>
                            <div className="text-muted text-xs">{"// "}Fetching HTML signals...</div>
                            <div className="ml-2 space-y-1 text-xs border-l-2 pl-4" style={{ borderColor: "rgba(79,172,254,0.3)" }}>
                                <div><span className="text-muted">name:</span> <span className="text-text">&quot;ABC Plumbing Austin&quot;</span></div>
                                <div><span className="text-muted">type:</span> <span className="text-accent2">&quot;LocalBusiness&quot;</span></div>
                                <div><span className="text-muted">services:</span> <span className="text-text">[&quot;drain repair&quot;, &quot;water heater&quot;, ...]</span></div>
                                <div><span className="text-muted">schema:</span> <span className="text-danger">❌ missing</span></div>
                            </div>
                            <div className="pt-2 flex items-center gap-3">
                                <span className="text-muted">Entity Score:</span>
                                <span className="text-warn font-bold">48 / 100</span>
                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,176,32,0.1)", color: "#FFB020", border: "1px solid rgba(255,176,32,0.2)" }}>Needs Work</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-4 rounded-sm bg-accent animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 flex justify-center">
                    <a href="#audit" className="btn-primary px-8 py-3.5">
                        Run My Free AI Audit →
                    </a>
                </div>
            </div>
        </section>
    );
}
