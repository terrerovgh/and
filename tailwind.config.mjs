/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: '#0a2540',
          dark: '#081d33',
          border: 'rgba(255, 255, 255, 0.35)',
          borderLight: 'rgba(255, 255, 255, 0.15)',
          grid: 'rgba(255, 255, 255, 0.08)',
          text: '#ffffff',
          textMuted: 'rgba(255, 255, 255, 0.75)',
          textDim: 'rgba(255, 255, 255, 0.5)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
