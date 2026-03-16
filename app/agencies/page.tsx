import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/landing/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AIScan for Agencies — White-Label AI Audit Platform",
    description: "Give every client an AI Visibility Score. White-label reports, multi-domain dashboards, and bulk audit imports built for agencies.",
};

const features = [
    { title: "White-Label Reports", desc: "Brand every PDF and dashboard with your agency logo, colors, and domain. Clients never see AIScan." },
    { title: "Multi-Domain Dashboard", desc: "Manage all client sites from a single command center. Track score trends, alerts, and audits at scale." },
    { title: "Bulk Audit Imports", desc: "Upload a CSV of 100s of client URLs and run audits in batch. Ideal for onboarding new clients at volume." },
    { title: "API Access", desc: "Embed AI Visibility Scores directly inside your own SaaS tools, client portals, or reporting dashboards." },
    { title: "Monthly Client Reports", desc: "Auto-generate and email branded PDF score reports to each client on a custom schedule." },
    { title: "Sales Tool Built-In", desc: "Run a free audit on any prospect site in 60 seconds during a sales call. Close deals faster with live data." },
];

export default function AgenciesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            <Nav />
            <main className="flex-1">
                {/* Hero */}
                <section className="py-32 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at center, rgba(59,158,255,0.07) 0%, transparent 70%)" }} />
                    <div className="container mx-auto px-4 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 border border-accent2/30 bg-accent2/5 rounded-full px-4 py-1.5 mb-8">
                            <div className="w-2 h-2 rounded-full bg-accent2 animate-pulse" />
                            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent2 font-medium">FOR DIGITAL AGENCIES</span>
                        </div>
                        <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-text mb-8 leading-[1.0]">
                            The AI Audit Platform<br />
                            <span className="text-accent2">Built for Agencies.</span>
                        </h1>
                        <p className="text-muted text-xl max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
                            Give every client an AI Visibility Score. White-label the whole experience.
                            Used by 300+ agencies to win new clients and prove ROI every month.
                        </p>
                        <a href="/audit" className="inline-flex items-center bg-accent2 text-bg px-10 py-5 rounded text-lg font-bold font-sans hover:brightness-110 transition-all shadow-[0_0_30px_rgba(59,158,255,0.25)]">
                            Start Agency Trial Free &rarr;
                        </a>
                        <div className="mt-4 font-mono text-xs text-muted">No credit card · Includes 10 free client audits</div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="py-20 bg-surface border-y border-border">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-center text-text mb-16">
                            Everything Your Agency Needs
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((f, i) => (
                                <div key={i} className="p-7 bg-bg border border-border rounded-xl hover:border-accent2/40 transition-colors">
                                    <div className="font-mono text-accent2 text-sm mb-3">0{i + 1}</div>
                                    <h3 className="font-bold text-lg mb-2 text-text">{f.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}
