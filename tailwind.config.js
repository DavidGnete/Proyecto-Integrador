const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "// <--- todo lo de src\r\n    \"./app/**/*.{js,ts,jsx,tsx}\"",
    "// <--- todo lo de app",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
    },
  },
  plugins: [heroui()],
};
