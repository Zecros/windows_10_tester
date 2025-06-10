/* eslint-env node */
/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float1': 'float1 8s ease-in-out infinite',
        'float2': 'float2 6s ease-in-out infinite',
        'floatSlow1': 'floatSlow1 15s ease-in-out infinite',
        'floatSlow2': 'floatSlow2 18s ease-in-out infinite',
        'floatSlow3': 'floatSlow3 20s ease-in-out infinite',
      },
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
        // New Palette
        primary: '#007AFF', // Keeping iOS Blue
        'primary-tap': '#005ECC', // Darker blue for tap state, consistent with primary
        background: '#F8F9FA', // Soft, neutral light gray
        'secondary-background': '#FFFFFF', // White for content cards
        text: '#212529', // Dark gray for primary text
        'secondary-text': '#6C757D', // Lighter gray for secondary text
        border: '#DEE2E6', // Light, subtle border color

        // Existing utility colors (can be kept or adjusted if needed)
        secondary: '#6C757D', // Using the new secondary-text color for general secondary purposes
        green: '#34C759', // iOS Green
        red: '#FF3B30', // iOS Red
        yellow: '#FFCC00', // iOS Yellow
        blue: '#007AFF', // iOS Blue (same as primary for consistency)

        // It's often good practice to define explicit dark mode colors if they don't purely follow algorithmic changes.
        // However, for this setup, we'll primarily manage dark mode via CSS variables in index.css
        // that will reference these base names or new dark-specific names if necessary.
        // For Tailwind's dark: prefix to work out-of-the-box with these, these are the "light" mode colors.
      }
    },
  },
  plugins: [],
}
