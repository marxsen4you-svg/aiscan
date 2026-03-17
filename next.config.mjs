/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required for Netlify deployment
    output: "standalone",

    // Suppress build warnings for known packages
    experimental: {
        serverComponentsExternalPackages: ["@supabase/supabase-js"],
    },

    // Ignore ESLint errors during Netlify build
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Ignore TS errors during build (we handle them in dev)
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
