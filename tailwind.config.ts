import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'mobileS': '320px',
      // => @media (min-width: 640px) { ... }

      'mobileM': '375px',
      // => @media (min-width: 640px) { ... }

      'mobileL': '425px',
      // => @media (min-width: 640px) { ... }

      'tablet': '426px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [],
}
export default config
