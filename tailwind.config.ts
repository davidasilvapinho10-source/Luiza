import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#e7b8c8',
        nude: '#f5ece8',
        stone: '#f6f4f2'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(30, 20, 20, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
