"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuditProgress } from "@/components/ui/AuditProgress";
import { Nav } from "@/components/layout/Nav";
import { motion } from "framer-motion";

function AuditContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetUrl = searchParams.get("url") || "your website";

    useEffect(() => {
        let isMounted = true;
        const execute = async () => {
            const { runAudit } = await import("@/lib/actions");
            const startTime = Date.now();
            const id = await runAudit(targetUrl);
            const elapsed = Date.now() - startTime;
            const minWait = 6500;
            if (elapsed < minWait) {
                await new Promise((r) => setTimeout(r, minWait - elapsed));
            }
            if (isMounted) {
                router.push(`/results/${id}`);
            }
        };
        execute();
        return () => { isMounted = false; };
    }, [router, targetUrl]);

    return (
        <div className="w-full flex flex-col items-center">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
            >
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-mono font-medium uppercase tracking-widest"
                    style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", color: "#00E5A0" }}>
                    <span className="live-dot" />
                    Analysis Active
                </div>

                <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text mb-4 tracking-tight">
                    Auditing Your <span style={{
                        background: "linear-gradient(135deg, #00E5A0, #00BFFF)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                    }}>AI Presence</span>
                </h1>

                {/* Target URL display */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono"
                    style={{ background: "rgba(12,17,34,0.8)", border: "1px solid rgba(255,255,255,0.08)", color: "#8A9BC0" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 2.5C4.5 4 4.5 8 6 9.5M6 2.5C7.5 4 7.5 8 6 9.5M2.5 6h7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span className="text-text/80 truncate max-w-[300px]">{targetUrl}</span>
                </div>
            </motion.div>

            {/* Progress component */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
            >
                <AuditProgress url={targetUrl} />
            </motion.div>

            {/* Bottom note */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-xs font-mono text-muted text-center"
            >
                Do not close this window · Redirecting to your report automatically
            </motion.p>
        </div>
    );
}

export default function AuditPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: "#060912" }}>
            {/* Radial glow bg */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,191,255,0.08) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px]"
                    style={{ background: "radial-gradient(circle, rgba(0,229,160,0.05), transparent 70%)" }} />
                {/* Grid */}
                <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }} />
            </div>

            <Nav />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-2xl">
                    <Suspense fallback={
                        <div className="text-center text-muted font-mono text-sm animate-pulse">
                            Initializing scanner...
                        </div>
                    }>
                        <AuditContent />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
