import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1629',
        surface: '#162035',
        surface2: '#1C2A45',
        border: 'rgba(255,255,255,0.1)',
        accent: '#00D68F',
        accent2: '#4FACFE',
        danger: '#FF5252',
        warn: '#FFB020',
        success: '#00D68F',
        text: '#F0F5FF',
        muted: '#8DA4CC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
