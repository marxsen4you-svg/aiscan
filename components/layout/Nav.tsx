"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const links = [
        { label: "Platform", href: "/#how-it-works" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Pricing", href: "/pricing" },
        { label: "Agencies", href: "/agencies" },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full h-[68px]"
            style={{
                background: "rgba(5,8,16,0.75)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                        <div className="absolute w-7 h-7 rounded-lg rotate-45 opacity-80"
                            style={{ background: "linear-gradient(135deg, #00E5A0, #4FACFE)" }} />
                        <span className="relative font-display font-bold text-xs text-bg z-10">AI</span>
                    </div>
                    <span className="font-display font-bold text-[17px] tracking-tight text-text">
                        AIScan
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className="hover:text-text transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href={isHome ? "#audit" : "/audit"}
                        className="btn-primary text-[13px] px-5 py-2.5"
                    >
                        Run Free Audit
                        <span className="text-bg/70">→</span>
                    </Link>
                    <button className="md:hidden text-muted hover:text-text transition-colors" aria-label="Open menu">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
