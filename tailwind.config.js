// tailwind.config.js
export default {
  darkMode: 'class', // Habilita el modo oscuro por clase
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a202c',  // Fondo oscuro
        lightBackground: '#f5f5f5', // Fondo claro
      },
    },
  },
  plugins: [],
}
