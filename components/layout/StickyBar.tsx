"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function StickyBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // For simplicity: Just show after 3s
        const timer = setTimeout(() => {
            if (!isDismissed) setIsVisible(true);
        }, 3000);

        // On mobile immediately
        if (window.innerWidth < 768 && !isDismissed) {
            setIsVisible(true);
        }

        return () => clearTimeout(timer);
    }, [isDismissed]);

    if (!isVisible || isDismissed) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-11 bg-surface border-b border-border z-50 flex items-center justify-center px-4 overflow-hidden shadow-lg animate-[slideDown_0.3s_ease-out]">
            <div className="container max-w-7xl mx-auto flex items-center justify-between">
                {/* Left message */}
                <div className="flex items-center gap-2 font-mono text-xs text-muted truncate max-w-[80%] pr-4">
                    <span className="text-danger leading-none animate-[pulse_2s_infinite]">🔴</span>
                    <span className="truncate">Live: AI assistants are choosing your competitors right now.</span>
                </div>

                {/* Right side CTA & dismiss */}
                <div className="flex items-center gap-4 shrink-0">
                    <a href="#audit" className="text-accent font-mono text-xs hover:underline hidden sm:block whitespace-nowrap">
                        Check My AI Score &rarr;
                    </a>
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="text-muted hover:text-text transition-colors p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}} />
        </div>
    );
}
