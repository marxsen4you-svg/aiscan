import Link from "next/link";

export function Footer() {
    return (
        <footer className="section-divider py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Glow divider */}
                <div className="glow-line mb-12" />

                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <div className="absolute w-6 h-6 rounded-md rotate-45"
                                    style={{ background: "linear-gradient(135deg, #00E5A0, #4FACFE)" }} />
                                <span className="relative font-display font-bold text-[10px] text-bg z-10">AI</span>
                            </div>
                            <span className="font-display font-bold text-base tracking-tight text-text">AIScan</span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-[220px]">
                            The AI Discoverability Audit platform for local businesses and agencies.
                        </p>
                    </div>

                    {/* Platform */}
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-text font-semibold text-xs uppercase tracking-widest mb-1">Platform</span>
                        <Link href="/#how-it-works" className="text-muted hover:text-accent transition-colors">How it Works</Link>
                        <Link href="/pricing" className="text-muted hover:text-accent transition-colors">Pricing</Link>
                        <Link href="/agencies" className="text-muted hover:text-accent transition-colors">Agencies</Link>
                        <Link href="/audit" className="text-muted hover:text-accent transition-colors">Run Free Audit</Link>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-3 text-sm md:items-end">
                        <span className="text-text font-semibold text-xs uppercase tracking-widest mb-1">Legal</span>
                        <Link href="/privacy" className="text-muted hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-muted hover:text-accent transition-colors">Terms of Service</Link>
                        <span className="text-muted mt-4 text-xs">© {new Date().getFullYear()} AIScan. All rights reserved.</span>
                    </div>
                </div>

                <div className="glow-line" />
            </div>
        </footer>
    );
}
