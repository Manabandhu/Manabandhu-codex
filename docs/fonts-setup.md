# Font Setup Guide

## Required Fonts
- **Inter** (Primary sans-serif)
- **Poppins** (Display font)

## Installation Steps

### 1. Install Expo Google Fonts
```bash
cd apps/mobile
npx expo install @expo-google-fonts/inter @expo-google-fonts/poppins expo-font
```

### 2. Load Fonts in App

Add to `apps/mobile/app/_layout.tsx`:

```typescript
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  
  // ... rest of layout
}
```

### 3. Tailwind Config

Already configured in `apps/mobile/tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui'],
  display: ['Poppins', 'system-ui']
}
```

### 4. Usage

```tsx
<Text className="font-sans">Regular text with Inter</Text>
<Text className="font-display font-bold">Heading with Poppins</Text>
```

## Web Support

For web builds, add to `apps/web/app/_document.tsx` or global CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```
