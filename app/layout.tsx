import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AIScan — AI Discoverability Audit',
    description: 'Will ChatGPT recommend your business? Find out in 60 seconds with a free AI Visibility Score.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
                <body className="min-h-screen flex flex-col font-sans antialiased">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
