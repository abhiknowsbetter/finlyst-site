import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // keep DEFAULT breakpoints
    screens: { sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px' },
    extend: {
      colors: {
        bg: '#0f1113',
        surface: '#121315',
        muted: '#a3a3a3',
        text: '#e6e6e6',
        accent1: '#2F80ED',
        accent2: '#56CCF2',
        matte: { black:'#0a0a0a', coal:'#0f1115', graphite:'#1b1e24' },
        silver: { 50:'#f7f7f7',100:'#eeeeee',200:'#d9d9d9',300:'#c4c4c4',400:'#a9a9a9',500:'#8f8f8f',600:'#777777',700:'#5f5f5f',800:'#4b4b4b',900:'#383838' }
      },
      fontFamily: {
        inter: ["Inter", "Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow:{ glow:'0 0 40px 8px rgba(200,200,200,0.08)' },
      backgroundImage:{
        'metal-brush': 'radial-gradient(1200px 600px at 20% -20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(1000px 500px at 120% 120%, rgba(255,255,255,0.05), transparent 60%)'
      }
    }
  },
  plugins: [],
};
export default config;