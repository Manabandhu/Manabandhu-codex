export const theme = {
  colors: {
    primary: { 50: '#E0F2FE', 100: '#BAE6FD', 500: '#0EA5E9', 600: '#0284C7', 700: '#0369A1' },
    accent: { 500: '#F97316', 600: '#EA580C' },
    gray: { 50: '#F9FAFB', 100: '#F3F4F6', 500: '#6B7280', 900: '#111827' }
  },
  fonts: { primary: 'Inter', secondary: 'Poppins' },
  radius: { sm: 16, md: 20, lg: 24 },
  spacing: (n: number) => n * 8,
  animations: { fast: 150, normal: 300, slow: 500 }
};
