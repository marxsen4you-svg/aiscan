"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
    {
        id: "crawl",
        label: "Crawling Homepage",
        detail: "Fetching HTML, metadata, and page structure",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8 6.507 6.507 0 0 1 8 1.5m0-1A7.5 7.5 0 1 0 15.5 8 7.5 7.5 0 0 0 8 .5Z" fill="currentColor" />
                <path d="M8 4.5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "entity",
        label: "Entity Analysis",
        detail: "Generating AI brand summary and entity clarity score",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9.5 11.5h4M11.5 9.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "schema",
        label: "Schema Detection",
        detail: "Scanning for LocalBusiness, FAQ, Service, and Organization markup",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "ai",
        label: "AI Query Testing",
        detail: "Running 20 queries across ChatGPT, Perplexity, and Gemini",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 8.5 7 10l3.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "score",
        label: "Scoring & Report",
        detail: "Calculating AI Visibility Score and compiling action items",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13V8m3.5 5V5M10 13V3m3.5 10V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
];

const LOG_LINES = [
    "→ Initiating HTTP request to target...",
    "→ Parsing HTML document structure",
    "→ Extracting meta tags and OpenGraph data",
    "→ Detecting JSON-LD schema blocks",
    "→ Analyzing entity name and service area",
    "→ Checking LocalBusiness markup... not found",
    "→ Running NLP entity extraction",
    "→ Simulating ChatGPT brand query",
    "→ Simulating Perplexity search query",
    "→ Simulating Gemini location query",
    "→ Evaluating authority signals",
    "→ Calculating citation probability",
    "→ Computing dimension scores",
    "→ Generating AI Visibility Score",
    "→ Compiling priority action list",
];

interface AuditProgressProps {
    url?: string;
    onComplete?: () => void;
}

export function AuditProgress({ onComplete }: AuditProgressProps) {
    const DURATION = 6000;
    const [progress, setProgress] = useState(0);
    const [logLines, setLogLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const startTime = Date.now();
        let rAF: number;
        const logInterval: ReturnType<typeof setInterval> = setInterval(() => { return; }, 99999);
        clearInterval(logInterval);

        let lineIdx = 0;
        const logTimer = setInterval(() => {
            if (lineIdx < LOG_LINES.length) {
                setLogLines((prev) => [...prev.slice(-6), LOG_LINES[lineIdx]]);
                lineIdx++;
            }
        }, DURATION / LOG_LINES.length);

        const loop = () => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / DURATION) * 100, 100);
            setProgress(pct);

            if (pct < 100) {
                rAF = requestAnimationFrame(loop);
            } else {
                setDone(true);
                onComplete?.();
            }
        };

        rAF = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rAF);
            clearInterval(logTimer);
        };
    }, [onComplete, DURATION]);

    const completedPhases = Math.floor((progress / 100) * PHASES.length);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">

            {/* ── Big progress ring + percentage ── */}
            <div className="flex justify-center mb-6">
                <div className="relative" style={{ width: 140, height: 140 }}>
                    <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
                        <defs>
                            <linearGradient id="auditGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00E5A0" />
                                <stop offset="100%" stopColor="#00BFFF" />
                            </linearGradient>
                        </defs>
                        {/* Track */}
                        <circle cx={70} cy={70} r={60} fill="none"
                            stroke="rgba(255,255,255,0.05)" strokeWidth={8} />
                        {/* Glow */}
                        <circle cx={70} cy={70} r={60} fill="none"
                            stroke="#00E5A0" strokeWidth={12} strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
                            opacity={0.15}
                            style={{ transition: "stroke-dashoffset 0.1s linear", filter: "blur(4px)" }} />
                        {/* Main */}
                        <circle cx={70} cy={70} r={60} fill="none"
                            stroke="url(#auditGrad)" strokeWidth={8} strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
                            style={{ transition: "stroke-dashoffset 0.1s linear", filter: "drop-shadow(0 0 8px rgba(0,229,160,0.5))" }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                        <span className="font-display font-bold text-3xl" style={{
                            background: "linear-gradient(135deg, #00E5A0, #00BFFF)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                        }}>
                            {Math.round(progress)}
                        </span>
                        <span className="text-xs font-mono text-muted">%</span>
                    </div>
                </div>
            </div>

            {/* ── Phase checklist ── */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(12,17,34,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {PHASES.map((phase, i) => {
                    const isComplete = i < completedPhases;
                    const isActive = i === completedPhases && !done;
                    return (
                        <div key={phase.id}
                            className="flex items-center gap-4 px-5 py-3.5 transition-all duration-500"
                            style={{
                                borderBottom: i < PHASES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                background: isActive ? "rgba(0,229,160,0.04)" : "transparent",
                            }}>

                            {/* Status icon */}
                            <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500"
                                style={{
                                    background: isComplete ? "rgba(0,229,160,0.15)" : isActive ? "rgba(0,229,160,0.08)" : "rgba(255,255,255,0.04)",
                                    border: isComplete ? "1px solid rgba(0,229,160,0.3)" : isActive ? "1px solid rgba(0,229,160,0.2)" : "1px solid rgba(255,255,255,0.06)",
                                    color: isComplete ? "#00E5A0" : isActive ? "#00E5A0" : "#4A5A7B",
                                }}>
                                {isComplete ? (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : isActive ? (
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted/30" />
                                )}
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold transition-all duration-300"
                                    style={{ color: isComplete ? "#F2F6FF" : isActive ? "#F2F6FF" : "#8A9BC0" }}>
                                    {phase.label}
                                </div>
                                {isActive && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                        className="text-xs text-muted mt-0.5">{phase.detail}</motion.div>
                                )}
                            </div>

                            {/* Right status */}
                            <div className="shrink-0 text-[10px] font-mono">
                                {isComplete && <span style={{ color: "#00E5A0" }}>Done</span>}
                                {isActive && <span className="text-muted animate-pulse">Running...</span>}
                                {!isComplete && !isActive && <span className="text-muted/40">Pending</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Streaming log ── */}
            <div className="rounded-xl px-5 py-4"
                style={{ background: "rgba(5,8,16,0.9)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-jetbrains-mono)", minHeight: 120 }}>
                <div className="text-[9px] text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="live-dot" />
                    Live Analysis Stream
                </div>
                <AnimatePresence mode="popLayout">
                    {logLines.map((line, i) => (
                        <motion.div key={line + i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: i === logLines.length - 1 ? 1 : 0.35 }}
                            className="text-[11px] leading-relaxed"
                            style={{ color: i === logLines.length - 1 ? "#00E5A0" : "#8A9BC0" }}>
                            {line}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
