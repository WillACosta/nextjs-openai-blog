const colorsGrade = [50, 100, 200, 300, 400, 500, 600, 700, 900, 950]
const sizes = [100, 250, 350, 400, 450, 500, 650, 700]

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
  plugins: [
    require("tailwindcss-radix")(),
  ],
  // we need to inform tailwind compiler all classes will be available on app, even dynamic classes
  safelist: [
    ...colorsGrade.map((color) => `bg-purple-${color}`),
    ...sizes.map((s) => `w-[${s}]`),
    ...sizes.map((s) => `h-[${s}]`)
  ]
}
