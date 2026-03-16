import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — AIScan",
    description: "AIScan privacy policy. We don't store your website data or share it with third parties.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            <Nav />
            <main className="flex-1 py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="mb-12">
                        <div className="font-mono text-accent text-sm mb-4">{"// "}legal</div>
                        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6">Privacy Policy</h1>
                        <p className="text-muted font-mono text-sm">Last updated: March 15, 2026</p>
                    </div>

                    <div className="space-y-10 font-sans text-text/90 leading-relaxed">
                        {[
                            {
                                title: "1. What We Collect",
                                body: "When you submit a URL for an AI Discoverability Audit, we temporarily process publicly accessible content from that URL to generate your score. We store your audit report (score and breakdown) linked to a unique report ID so you can retrieve it via your shareable link. We do not collect or store any personal information unless you voluntarily create an account."
                            },
                            {
                                title: "2. How We Use Your Data",
                                body: "Audit data is used solely to generate and display your AI Visibility Score and accompanying report. We do not sell, rent, or share your website data with any third parties. Aggregate, anonymized trend data may be used to improve the accuracy of our scoring models."
                            },
                            {
                                title: "3. Data Retention",
                                body: "Audit reports are stored for up to 90 days and then permanently deleted. If you have a Pro or Agency account, reports are retained for the duration of your subscription plus 30 days after cancellation."
                            },
                            {
                                title: "4. Cookies",
                                body: "We use strictly necessary cookies to maintain session state. We do not use advertising or tracking cookies. No third-party analytics platforms are embedded in your session."
                            },
                            {
                                title: "5. Third-Party Services",
                                body: "AIScan fetches publicly available HTML from URLs you submit to perform audits. This is equivalent to a standard web crawler visit. We do not log any credentials, form submissions, or private data from those pages."
                            },
                            {
                                title: "6. Contact",
                                body: "For privacy-related questions, contact us at privacy@aiscan.com."
                            },
                        ].map((section, i) => (
                            <div key={i} className="border-t border-border pt-8">
                                <h2 className="font-display font-bold text-xl mb-4 text-text">{section.title}</h2>
                                <p className="text-muted">{section.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
