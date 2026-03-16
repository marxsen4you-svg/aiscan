import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service — AIScan",
    description: "AIScan terms of service. Read about your rights and responsibilities when using the platform.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            <Nav />
            <main className="flex-1 py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="mb-12">
                        <div className="font-mono text-accent text-sm mb-4">{"// "}legal</div>
                        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6">Terms of Service</h1>
                        <p className="text-muted font-mono text-sm">Last updated: March 15, 2026</p>
                    </div>

                    <div className="space-y-10 font-sans text-text/90 leading-relaxed">
                        {[
                            {
                                title: "1. Acceptance",
                                body: "By accessing or using AIScan, you agree to these Terms of Service. If you do not agree, do not use the Service. These terms apply to all users, including free and paid accounts."
                            },
                            {
                                title: "2. Description of Service",
                                body: "AIScan provides an AI Discoverability Audit tool that analyzes publicly accessible website data and returns an AI Visibility Score with a breakdown of contributing signals. The Service is provided for informational purposes and does not constitute professional SEO or legal advice."
                            },
                            {
                                title: "3. Acceptable Use",
                                body: "You may only submit URLs for websites you own or have permission to audit. You may not use AIScan to audit competitors' sites for the purpose of malicious competitive intelligence gathering, or to generate misleading reports. Abuse of the free tier (e.g., automated bulk submissions) may result in rate limiting or account termination."
                            },
                            {
                                title: "4. Accuracy of Scores",
                                body: "AI Visibility Scores are based on publicly available heuristics and are approximations, not guarantees of performance in any AI search platform. Results may vary. AIScan makes no warranties about the completeness or accuracy of scores."
                            },
                            {
                                title: "5. Payments and Refunds",
                                body: "Paid subscriptions are billed monthly or annually. You may cancel at any time; cancellations take effect at the end of the current billing period. Refunds are not provided for partial periods, except where required by applicable law."
                            },
                            {
                                title: "6. Limitation of Liability",
                                body: "AIScan is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our maximum liability to you for any claim arising from these Terms is limited to the amount you paid us in the 12 months preceding the claim."
                            },
                            {
                                title: "7. Changes to Terms",
                                body: "We may update these Terms from time to time. We will notify you of material changes by email or via a notice in the dashboard. Continued use of the Service after changes constitutes acceptance of the revised Terms."
                            },
                            {
                                title: "8. Contact",
                                body: "For terms-related questions, contact us at legal@aiscan.com."
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
