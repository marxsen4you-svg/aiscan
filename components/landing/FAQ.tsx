"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "How accurate is the AI Visibility Score?",
        a: "Our score is based on 169+ signals including schema presence, entity clarity, authority signals, and citation share. It's a strong proxy for how AI models currently evaluate and recommend businesses, backed by ongoing model testing. Scores correlate highly with actual AI citation frequency."
    },
    {
        q: "Which AI platforms do you test against?",
        a: "We test against ChatGPT (GPT-4o), Perplexity, Google Gemini, and Claude. Our scoring engine simulates how each model's retrieval layer processes your business entity."
    },
    {
        q: "Do I need to give you login access or install anything?",
        a: "No. We only analyze publicly available information the same way any AI model would — your website's HTML, schema markup, and public authority signals. No credentials, no plugins, no installs."
    },
    {
        q: "How long does an audit take?",
        a: "The scanning process runs in approximately 60 seconds. Your report is instantly available and shareable via a unique URL."
    },
    {
        q: "What's the difference between Free and Pro?",
        a: "Free gives you a one-time full audit with your score and top 3 fixes. Pro adds unlimited re-scans, weekly alert monitoring, competitor comparison, PDF reports, and score trend tracking over time."
    },
    {
        q: "Can I white-label the reports for clients?",
        a: "Yes — the Agency plan includes full white-label PDF reports branded with your logo, a multi-domain client dashboard, and bulk import tools for onboarding clients at scale."
    },
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-28 section-divider relative">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-14">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="badge mb-6">FAQ</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="font-display font-bold text-3xl tracking-tight text-text">
                        Questions Answered
                    </motion.h2>
                </div>

                <div className="space-y-2.5">
                    {faqs.map((faq, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "glass-card" : "glass-card"
                                }`}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                            >
                                <span className="font-display font-semibold text-sm md:text-base text-text">{faq.q}</span>
                                <ChevronDown
                                    className="shrink-0 text-muted transition-transform duration-300"
                                    size={18}
                                    style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                                />
                            </button>

                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-sm text-muted leading-relaxed border-t"
                                            style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                                            <div className="pt-4">{faq.a}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
