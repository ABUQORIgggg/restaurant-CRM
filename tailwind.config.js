/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'adaptive': 'calc(100vh - 102px)',
      },
      minHeight: {
        'adaptive': 'calc(100vh - 102px)',
      },
      maxHeight: {
        'adaptive': 'calc(100vh - 102px)',
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["night"], // This sets the theme to 'night'
  },
}