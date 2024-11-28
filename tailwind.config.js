/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'primary': '#0560f2',
          'primary-variant': '#0056b3',
          'secondary': '#dfe1e6',
          'secondary-variant': '#5A6268',
          'success': '#218838',

        }
    }
  },
  plugins: [],
}

