"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Nav() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const links = [
        { label: "Platform", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Agencies", href: "/agencies" },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full h-[68px]"
            style={{
                background: "rgba(15,22,41,0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute w-8 h-8 rounded-lg rotate-45"
                            style={{ background: "linear-gradient(135deg, #00D68F, #4FACFE)" }} />
                        <span className="relative font-display font-bold text-[10px] text-[#0F1629] z-10">AI</span>
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight text-text">
                        AIScan
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-muted">
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

                {/* CTA / Auth */}
                <div className="flex items-center gap-5">
                    <SignedOut>
                        <div className="hidden sm:block">
                            <SignInButton mode="modal">
                                <button className="text-[13px] font-medium text-muted hover:text-text transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                        <Link
                            href={isHome ? "#audit" : "/audit"}
                            className="btn-primary text-[12px] px-5 py-2"
                        >
                            Start Audit
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <Link
                            href="/dashboard"
                            className="btn-secondary text-[12px] px-5 py-2"
                        >
                            Dashboard
                        </Link>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
