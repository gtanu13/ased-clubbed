/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Effortlessly chic: Deepest wine/plum instead of pure black
        background: '#0d0208', 
        
        // Soft, feminine glass surface
        surface: 'rgba(45, 10, 30, 0.3)', 
        
        // The "Girls in Tech" palette
        primary: '#ff85a1',   // Chic Soft Rose
        secondary: '#fceef5', // Creamy Pearl
        accent: '#ffd700',    // Champagne Gold Glow
        muted: '#2d0a1e',     // Deep Plum for borders/subtle areas
      },
      fontFamily: {
        // Plus Jakarta Sans is more "chic" and high-end than Inter
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-chic': 'linear-gradient(to right, #ff85a1, #f9bec7, #ffd700)',
        'gradient-soft': 'radial-gradient(circle at top right, #2d0a1e 0%, #0d0208 100%)',
      },
      boxShadow: {
        'soft-glow': '0 0 20px rgba(255, 133, 161, 0.15)',
        'gold-glow': '0 0 25px rgba(255, 215, 0, 0.1)',
      }
    },
  },
  plugins: [],
}