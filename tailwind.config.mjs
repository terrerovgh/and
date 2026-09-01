/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: '#111d27',
          dark: '#0c1720',
          surface: '#1c2a36',
          ink: '#9db3c2',
          accent: '#c69a63',
          accentDeep: '#b5814a',
          border: 'rgba(240, 243, 245, 0.16)',
          borderLight: 'rgba(240, 243, 245, 0.085)',
          grid: 'rgba(157, 179, 194, 0.07)',
          text: '#f0f3f5',
          textMuted: 'rgba(240, 243, 245, 0.72)',
          textDim: 'rgba(240, 243, 245, 0.5)',
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
