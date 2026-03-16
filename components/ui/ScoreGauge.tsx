"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface ScoreGaugeProps {
    score: number;
    size?: number;
    strokeWidth?: number;
}

function getGradientColors(score: number) {
    if (score >= 70) return { from: "#00E5A0", to: "#4FACFE", glow: "rgba(0,229,160,0.35)" };
    if (score >= 40) return { from: "#FFB020", to: "#FF8C00", glow: "rgba(255,176,32,0.3)" };
    return { from: "#FF5252", to: "#FF1744", glow: "rgba(255,82,82,0.3)" };
}

function getLabel(score: number) {
    if (score >= 70) return { text: "AI Ready", color: "#00E5A0" };
    if (score >= 40) return { text: "Needs Work", color: "#FFB020" };
    return { text: "AI Invisible", color: "#FF5252" };
}

export function ScoreGauge({ score, size = 280, strokeWidth = 14 }: ScoreGaugeProps) {
    const { count, ref } = useCountUp(score, 1800);
    const [animProgress, setAnimProgress] = useState(0);
    const gradId = useRef(`grad-${Math.random().toString(36).slice(2)}`).current;
    const filterId = useRef(`glow-${Math.random().toString(36).slice(2)}`).current;

    const colors = getGradientColors(score);
    const label = getLabel(score);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    // 270° arc (gap at bottom)
    const arcLength = circumference * 0.75;
    const offset = arcLength - (arcLength * animProgress) / 100;
    const cx = size / 2;
    const cy = size / 2;

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimProgress(score);
        }, 400);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-[135deg]">
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.from} />
                        <stop offset="100%" stopColor={colors.to} />
                    </linearGradient>
                    <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Track */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${arcLength} ${circumference}`}
                />

                {/* Glow layer */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth={strokeWidth + 6}
                    strokeLinecap="round"
                    strokeDasharray={`${arcLength} ${circumference}`}
                    strokeDashoffset={offset}
                    opacity={0.2}
                    style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)", filter: `blur(4px)` }}
                />

                {/* Main arc */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${arcLength} ${circumference}`}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div
                    className="font-display font-bold tabular-nums"
                    style={{
                        fontSize: size * 0.2,
                        lineHeight: 1,
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {count}
                </div>
                <div className="text-xs font-mono text-muted uppercase tracking-widest">/ 100</div>
                <div
                    className="text-xs font-semibold mt-1 px-2.5 py-1 rounded-full"
                    style={{
                        color: label.color,
                        background: `${label.color}15`,
                        border: `1px solid ${label.color}30`,
                    }}
                >
                    {label.text}
                </div>
            </div>
        </div>
    );
}
