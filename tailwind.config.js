/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}" // Include if you're using the app directory (Next.js 13+)
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  