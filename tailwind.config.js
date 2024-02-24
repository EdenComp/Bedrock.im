/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-1': '#18111B',
        'background-2': '#1E1523',
        'interactive-1': '#301C3B',
        'interactive-2': '#3D224E',
        'interactive-3': '#48295C',
        'border-1': '#54346B',
        'border-2': '#664282',
        'border-3': '#8457AA',
        'solid-1': '#8E4EC6',
        'solid-2': '#9A5CD0',
        'text-1': '#D19DFF',
        'text-2': '#ECD9FA',
        'new': '#FF5555',
        'changed': '#FFE777',
      }
    }
  },
  plugins: [],
}

