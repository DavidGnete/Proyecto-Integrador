const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js",
  ],
  safelist: [
    // Incluir todas las clases responsive para evitar purging
    { pattern: /^(sm|md|lg|xl|2xl):.*/ },
    // Agregar clases específicas comunes
    'flex', 'block', 'hidden', 'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'w-full', 'max-w-7xl', 'px-4', 'px-6', 'py-8', 'text-center', 'text-left', 'justify-center', 'items-center', 'gap-4', 'gap-6', 'bg-white', 'bg-slate-50', 'text-slate-900', 'text-slate-600', 'border', 'border-slate-200', 'rounded-xl', 'shadow-sm', 'hover:shadow-lg', 'transition-all', 'duration-300',
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
    },
  },
  plugins: [heroui()],
};
