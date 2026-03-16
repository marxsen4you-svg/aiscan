import { StickyBar } from "@/components/layout/StickyBar";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/landing/Hero";
import { FearSection } from "@/components/landing/FearSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ScorePreview } from "@/components/landing/ScorePreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <StickyBar />
            <Nav />
            <Hero />
            <FearSection />
            <SolutionSection />
            <HowItWorks />

            {/* Standalone Score Preview Section */}
            <section className="py-24 bg-surface relative overflow-hidden flex flex-col items-center">
                <h2 className="font-display font-bold text-3xl md:text-5xl text-center text-text mb-16 px-4">
                    See What Your Report Looks Like
                </h2>
                <div className="w-full px-4">
                    <ScorePreview />
                </div>
            </section>

            <Testimonials />
            <Features />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
