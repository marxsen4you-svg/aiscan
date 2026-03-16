import { mockAuditData } from "@/lib/mockAuditData";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { ScoreBreakdown } from "@/components/ui/ScoreBreakdown";
import { X } from "lucide-react";

export function ScorePreview() {
    return (
        <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl"
            style={{
                background: "rgba(8,13,26,0.7)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 60px rgba(0,229,160,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
            {/* Top bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-warn/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
                <span className="ml-2 text-[10px] font-mono text-muted uppercase tracking-widest">AI Visibility Report</span>
                <span className="ml-auto text-[9px] font-mono text-muted bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded-full">DEMO</span>
            </div>

            <div className="p-6">
                {/* Score Gauge */}
                <div className="flex justify-center mb-6">
                    <ScoreGauge score={mockAuditData.overallScore} size={200} strokeWidth={12} />
                </div>

                {/* Breakdowns */}
                <div className="space-y-3.5 mb-6">
                    {mockAuditData.metrics.map((metric) => (
                        <ScoreBreakdown key={metric.label} {...metric} />
                    ))}
                </div>

                {/* Sample Issues */}
                <div className="rounded-xl p-4 mb-5" style={{
                    background: "rgba(255,82,82,0.05)",
                    border: "1px solid rgba(255,82,82,0.12)"
                }}>
                    {mockAuditData.issues.slice(0, 2).map((issue, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-text/70 mb-1.5 last:mb-0">
                            <X className="w-3 h-3 text-danger shrink-0 mt-0.5" />
                            <span>{issue.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a href="/audit" className="btn-primary w-full rounded-xl py-3.5 text-sm justify-center">
                    Get Your Real Score →
                </a>
            </div>
        </div>
    );
}
