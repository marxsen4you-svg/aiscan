"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { ScoreBreakdown } from "@/components/ui/ScoreBreakdown";
import { AlertTriangle, CheckCircle, Share2, RotateCcw, ArrowRight, Copy, Check } from "lucide-react";

interface Issue { severity: "high" | "medium" | "low"; text: string; }
interface Metric { label: string; score: number; max: number; }
interface ReportData {
    url: string;
    overallScore: number;
    metrics: Metric[];
    issues: Issue[];
}

const PRIORITY_ACTIONS = [
    { priority: "High", color: "#FF5252", text: "Add JSON-LD LocalBusiness schema to your homepage — this is the #1 signal AI models use to identify and recommend local businesses." },
    { priority: "High", color: "#FF5252", text: "Create a dedicated 'About' page with clear entity information: full business name, address, phone, services, and founding year." },
    { priority: "Medium", color: "#FFB020", text: "Add an FAQPage schema with 5–10 questions your customers actually ask. This directly feeds AI assistant responses." },
    { priority: "Medium", color: "#FFB020", text: "Publish at minimum 2 in-depth service pages with specific location mentions and service area descriptions." },
    { priority: "Low", color: "#00D68F", text: "Update your Google Business Profile Q&A section — AI models pull from this for local recommendation queries." },
];

function CopyButton({ reportId }: { reportId: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/results/${reportId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };
    return (
        <button onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: copied ? "rgba(0,214,143,0.15)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: copied ? "#00D68F" : "#F0F5FF" }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Link"}
        </button>
    );
}

export function ResultsClient({ reportData, reportId }: { reportData: ReportData; reportId: string }) {
    const router = useRouter();

    const severityColor = (s: string) =>
        s === "high" ? "#FF5252" : s === "medium" ? "#FFB020" : "#00D68F";

    const scoreLabel = reportData.overallScore >= 70
        ? { text: "AI Ready", color: "#00D68F" }
        : reportData.overallScore >= 40
            ? { text: "Needs Work", color: "#FFB020" }
            : { text: "AI Invisible", color: "#FF5252" };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "#0F1629" }}>

            {/* Nav */}
            <nav className="sticky top-0 z-40 px-6 h-16 flex items-center justify-between"
                style={{ background: "rgba(15,22,41,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Link href="/" className="font-display font-bold text-lg tracking-tight text-text">AIScan</Link>
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/audit")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F5FF" }}>
                        <RotateCcw size={13} /> New Scan
                    </button>
                    <CopyButton reportId={reportId} />
                </div>
            </nav>

            <main className="flex-1 py-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="live-dot" />
                            <span className="text-xs font-mono text-muted uppercase tracking-widest">AI Visibility Report</span>
                        </div>
                        <h1 className="font-display font-bold text-3xl md:text-4xl text-text mb-2 tracking-tight">
                            Results for <span className="text-gradient">{reportData.url}</span>
                        </h1>
                        <p className="text-muted text-sm">Report ID: {reportId.toUpperCase()}</p>
                    </div>

                    {/* Score summary bar */}
                    <div className="rounded-2xl p-6 mb-8 flex flex-wrap items-center gap-6"
                        style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
                                style={{ background: `${scoreLabel.color}18`, border: `2px solid ${scoreLabel.color}40`, color: scoreLabel.color }}>
                                {reportData.overallScore}
                            </div>
                            <div>
                                <div className="font-display font-bold text-xl text-text">AI Visibility Score</div>
                                <div className="text-sm font-semibold mt-0.5" style={{ color: scoreLabel.color }}>{scoreLabel.text}</div>
                            </div>
                        </div>
                        <div className="flex-1 h-px hidden md:block" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <div className="flex items-center gap-3">
                            <Link href="/pricing" className="btn-primary text-sm px-5 py-2.5">
                                Upgrade to Pro <ArrowRight size={14} />
                            </Link>
                            <CopyButton reportId={reportId} />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6">

                        {/* Left: Score gauge + breakdown */}
                        <div className="lg:col-span-5 space-y-5">

                            {/* Gauge */}
                            <div className="rounded-2xl p-8 flex justify-center items-center"
                                style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                                <ScoreGauge score={reportData.overallScore} size={260} strokeWidth={13} />
                            </div>

                            {/* Breakdown */}
                            <div className="rounded-2xl p-6"
                                style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                                <h3 className="font-display font-semibold text-base text-text mb-5">Score Breakdown</h3>
                                <div className="space-y-5">
                                    {reportData.metrics.map((m, i) => (
                                        <ScoreBreakdown key={i} {...m} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Issues + Actions + CTA */}
                        <div className="lg:col-span-7 space-y-5">

                            {/* Issues */}
                            <div className="rounded-2xl p-6"
                                style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                                <h3 className="font-display font-semibold text-base text-text mb-5 flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-danger" />
                                    Detected Issues
                                </h3>
                                <div className="space-y-3">
                                    {reportData.issues.map((issue, idx) => (
                                        <div key={idx} className="flex gap-3 p-4 rounded-xl"
                                            style={{ background: `${severityColor(issue.severity)}0D`, border: `1px solid ${severityColor(issue.severity)}25` }}>
                                            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                                style={{ background: severityColor(issue.severity) }} />
                                            <div>
                                                <div className="text-[10px] font-mono font-bold uppercase mb-1" style={{ color: severityColor(issue.severity) }}>
                                                    {issue.severity} Priority
                                                </div>
                                                <p className="text-sm text-text leading-relaxed">{issue.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Plan */}
                            <div className="rounded-2xl p-6"
                                style={{ background: "#162035", border: "1px solid rgba(255,255,255,0.09)" }}>
                                <h3 className="font-display font-semibold text-base text-text mb-5 flex items-center gap-2">
                                    <CheckCircle size={16} style={{ color: "#00D68F" }} />
                                    Priority Action Plan
                                </h3>
                                <div className="space-y-4">
                                    {PRIORITY_ACTIONS.map((act, i) => (
                                        <div key={i} className="flex gap-4 items-start pb-4 last:pb-0"
                                            style={{ borderBottom: i < PRIORITY_ACTIONS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                                                style={{ background: `${act.color}18`, color: act.color, border: `1px solid ${act.color}30` }}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-mono font-bold uppercase mb-1" style={{ color: act.color }}>{act.priority}</div>
                                                <p className="text-sm text-text/90 leading-relaxed">{act.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upgrade CTA */}
                            <div className="rounded-2xl p-7"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,214,143,0.08), rgba(79,172,254,0.08))",
                                    border: "1px solid rgba(0,214,143,0.2)"
                                }}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                    <div>
                                        <h4 className="font-display font-bold text-lg text-text mb-2">Track Your Score Over Time</h4>
                                        <p className="text-muted text-sm leading-relaxed max-w-sm">
                                            Pro monitors your AI Visibility Score weekly, alerts you to drops, and compares you against competitors.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <Link href="/pricing" className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
                                            Unlock Pro →
                                        </Link>
                                        <span className="text-center text-xs text-muted">From $29/mo · Cancel anytime</span>
                                    </div>
                                </div>
                            </div>

                            {/* Re-run / Share */}
                            <div className="flex gap-3">
                                <button onClick={() => router.push("/audit")}
                                    className="flex-1 btn-secondary py-3 text-sm gap-2 justify-center">
                                    <RotateCcw size={14} /> Scan Another URL
                                </button>
                                <button onClick={() => { navigator.share?.({ title: "My AI Visibility Score", url: window.location.href }); }}
                                    className="flex-1 btn-secondary py-3 text-sm gap-2 justify-center">
                                    <Share2 size={14} /> Share Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
