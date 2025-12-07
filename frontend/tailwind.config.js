/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0EA5E9', 50: '#E0F2FE', 100: '#BAE6FD', 500: '#0EA5E9', 600: '#0284C7', 700: '#0369A1' },
        accent: { DEFAULT: '#F97316', 500: '#F97316', 600: '#EA580C' },
        gray: { 50: '#F9FAFB', 100: '#F3F4F6', 500: '#6B7280', 900: '#111827' }
      },
      fontFamily: { sans: ['Inter', 'system-ui'], display: ['Poppins', 'system-ui'] },
      borderRadius: { DEFAULT: '16px', md: '20px', lg: '24px' },
      spacing: { 1: '8px', 2: '16px', 3: '24px', 4: '32px', 5: '40px', 6: '48px' },
      transitionDuration: { fast: '150ms', normal: '300ms', slow: '500ms' }
    }
  },
  plugins: []
};
