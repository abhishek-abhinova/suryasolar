/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E', // Primary Teal Green
          dark: '#0d5c56',
          light: '#119c91',
        },
        secondary: {
          DEFAULT: '#FDB813', // Secondary Solar Yellow
          dark: '#e0a109',
          light: '#fec844',
        },
        dark: {
          DEFAULT: '#0F172A', // Dark Text/Background
          muted: '#475569',
          light: '#1E293B',
        },
        light: {
          DEFAULT: '#F8FAFC', // Light Background
          muted: '#E2E8F0',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'card': '14px', // 14px rounded card corners
        'btn': '12px',  // 12px button borders
      }
    },
  },
  plugins: [],
}


