/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./main.tsx"
  ],
  theme: {
    extend: {
      colors: {
        silver: "#D1D5DB",
        crystal: "#F9FAFB",
        slate: "#374151",
        obsidian: "#1F2937",
        cyan: "#00F0FF",
        sage: "#4ADE80",
        violet: "#8B5CF6",
        blue: "#3B82F6",
        background: "#0d1117",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(135deg, #1F2937 0%, #0d1117 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(55, 65, 81, 0.4) 0%, rgba(31, 41, 55, 0.4) 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
        'neon-violet': '0 0 10px rgba(139, 92, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
