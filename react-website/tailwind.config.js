/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primary: '#007AFF', // iOS Blue
        'primary-tap': '#005ECC', // Darker blue for tap state
        secondary: '#8E8E93', // iOS Gray
        background: '#F2F2F7', // iOS Light Background
        'secondary-background': '#FFFFFF', // iOS White Background
        text: '#1C1C1E', // iOS Primary Text (Dark Gray)
        'secondary-text': '#8A8A8D', // iOS Secondary Text (Medium Gray)
        border: '#C7C7CC', // iOS Border Color
        green: '#34C759', // iOS Green
        red: '#FF3B30', // iOS Red
        yellow: '#FFCC00', // iOS Yellow
        blue: '#007AFF', // iOS Blue (same as primary for consistency)
      }
    },
  },
  plugins: [],
}
