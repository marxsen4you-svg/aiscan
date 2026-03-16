"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface ScoreBreakdownProps {
    label: string;
    score: number;
    max: number;
}

function getBarColor(score: number, max: number) {
    const pct = score / max;
    if (pct >= 0.70) return { from: "#00E5A0", to: "#4FACFE", glow: "rgba(0,229,160,0.3)" };
    if (pct >= 0.40) return { from: "#FFB020", to: "#FF8C00", glow: "rgba(255,176,32,0.2)" };
    return { from: "#FF5252", to: "#FF1744", glow: "rgba(255,82,82,0.2)" };
}

export function ScoreBreakdown({ label, score, max }: ScoreBreakdownProps) {
    const { count, ref } = useCountUp(score, 1400);
    const pct = (count / max) * 100;
    const colors = getBarColor(score, max);

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text/80">{label}</span>
                <span className="font-mono text-xs font-bold tabular-nums" style={{ color: colors.from }}>
                    {count}<span className="text-muted font-normal">/{max}</span>
                </span>
            </div>
            <div className="progress-track">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                        boxShadow: `0 0 8px ${colors.glow}`,
                    }}
                />
            </div>
        </div>
    );
}
