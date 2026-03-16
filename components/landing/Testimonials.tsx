"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Marcus D.",
        title: "HVAC Owner, Austin TX",
        quote: "I had no idea I was completely invisible to AI assistants. After AIScan, I fixed 3 things and now ChatGPT actually names my business when people ask for HVAC in Austin.",
        before: 24,
        after: 71,
        delta: "+47",
    },
    {
        name: "Sarah K.",
        title: "Agency Director, Chicago",
        quote: "We use AIScan with every new client as a sales closer. Show them their score live on a call — it's an instant yes. Best $99/mo we spend across our whole stack.",
        before: 18,
        after: 82,
        delta: "+64",
    },
    {
        name: "James P.",
        title: "Dental Practice, Miami",
        quote: "We went from zero AI citations to being the first result in 4 different AI platforms for 'dentist near Miami Beach'. Six-week turnaround after implementing the fixes.",
        before: 31,
        after: 78,
        delta: "+47",
    },
];

export function Testimonials() {
    return (
        <section className="py-28 section-divider relative">
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(0,229,160,0.04), transparent 50%)" }} />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="badge mb-6">Customer Results</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl md:text-4xl tracking-tight text-text">
                        Real Scores. Real Growth.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-7 flex flex-col gap-5"
                        >
                            {/* Score badge */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 font-mono text-sm">
                                    <span className="text-muted">{t.before}</span>
                                    <span className="text-muted">→</span>
                                    <span className="font-bold" style={{ color: "#00E5A0" }}>{t.after}</span>
                                </div>
                                <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
                                    {t.delta} pts
                                </span>
                            </div>

                            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                            <p className="text-text/75 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

                            <div>
                                <div className="font-semibold text-sm text-text">{t.name}</div>
                                <div className="text-xs text-muted mt-0.5">{t.title}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
