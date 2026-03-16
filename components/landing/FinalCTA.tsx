"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTA() {
    return (
        <section className="relative py-32 overflow-hidden section-divider">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(ellipse at center, rgba(0,229,160,0.3) 0%, rgba(79,172,254,0.15) 40%, transparent 70%)", filter: "blur(60px)" }} />
            </div>

            <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="badge mb-8 mx-auto">Limited Free Access</motion.div>

                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                    className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-text mb-6">
                    Don&apos;t Wait Until Your Competitors<br />
                    <span className="text-gradient">Own AI Search.</span>
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.14 }}
                    className="text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                    Every day you&apos;re invisible, an AI assistant is recommending your competitor instead.
                    Your score takes 60 seconds. The fix might take an afternoon. The results last for years.
                </motion.p>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.18 }}
                    className="flex flex-col items-center gap-4">
                    <Link href="/audit" className="btn-primary text-base px-10 py-4 rounded-2xl">
                        Run My Free AI Audit →
                    </Link>
                    <div className="font-mono text-xs text-muted">
                        No credit card · No signup · Instant results
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
