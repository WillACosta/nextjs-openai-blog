/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: 'var(--inter-font-family)',
        heading: ''
      },
      backgroundImage: {
        'default-gradient': 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'
      }
    }
  },
  plugins: []
}
