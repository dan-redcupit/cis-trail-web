import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          /* Matt Lee's CIS Benchmark Blue Theme */
          blue: '#2ea3f2',
          darkblue: '#1a7ac0',
          lightblue: '#5bc0ff',
          /* Keep red and yellow for warnings/errors */
          red: '#ff4444',
          yellow: '#ffff00',
          cyan: '#00ffff',
          bg: '#0a0a0a',
        },
      },
      fontFamily: {
        mono: ['VT323', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
