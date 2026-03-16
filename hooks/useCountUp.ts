"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start);
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // easeOutCubic
            const easeOut = 1 - Math.pow(1 - percentage, 3);

            const currentVal = Math.floor(start + (target - start) * easeOut);
            setCount(currentVal);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(updateCount);
            } else {
                setCount(target);
            }
        };

        animationFrameId = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(animationFrameId);
    }, [target, duration, start, isInView]);

    return { count, ref };
}
