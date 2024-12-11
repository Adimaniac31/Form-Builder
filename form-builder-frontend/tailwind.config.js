/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the HTML entry file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript and TypeScript files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo color for primary elements
        secondary: "#9333EA", // Purple color for secondary elements
        neutral: "#F3F4F6", // Light gray for backgrounds
      },
    },
  },
  plugins: [],
};


