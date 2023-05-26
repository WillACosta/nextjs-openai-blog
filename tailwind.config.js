/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        muted: '#717171'
      },
      fontFamily: {
        body: 'var(--inter-font-family)',
        heading: 'var(--inter-font-family)'
      },
      backgroundImage: {
        'default-gradient': 'linear-gradient(145deg, #654ea3 0%, #eaafc8 100%)',
        'main-gradient': 'linear-gradient(135deg, #E6FEF1 10%, #8081D4 100%, #C56975 100%)'
      }
    }
  },
  plugins: []
}
