# Web Platform Issues - Summary

## Current Status
- **Mobile (Expo Go)**: ✅ Working - QR code scan works
- **Web**: ❌ Broken - Metro bundler cannot resolve expo-router/entry

## Root Cause
Expo Router 3.4.4 + Expo SDK 50 + Metro bundler has module resolution issues in monorepo setup. The entry point `expo-router/entry` cannot be resolved for web platform.

## Errors
```
Unable to resolve module ./node_modules/expo-router/entry
MIME type 'application/json' is not executable
```

## Solutions

### Option 1: Use Mobile Only (Recommended for now)
```bash
cd frontend
npx expo start
# Press 's' to switch to Expo Go
# Scan QR code with Expo Go app
```

### Option 2: Separate Web App
Create standalone Next.js or Vite app in `frontend-web/` folder sharing types from `packages/types`

### Option 3: Upgrade to Expo SDK 51+
Expo SDK 51+ has better web support, but requires:
- React Native 0.74+
- Update all expo packages
- Test all native modules compatibility

### Option 4: Use Webpack (Not Compatible)
Expo SDK 50 doesn't support @expo/webpack-config

## Temporary Workaround
Focus on mobile development. Web can be added later with separate stack or after Expo SDK upgrade.

## Files Modified
- `app.json` - Added runtimeVersion, removed sdkVersion
- `babel.config.js` - Removed all plugins to minimal config
- `metro.config.js` - Added workspace root resolution
- `app/_layout.tsx` - Commented out global.css
- `app.config.js` - Created for env variables
- `.env` - Created for API URL config

## Next Steps
1. Continue mobile development with Expo Go
2. Backend API at `http://YOUR_IP:3080/api/v1`
3. Update `.env` with your machine's IP for mobile testing
4. Consider separate web app or wait for Expo SDK 51 upgrade
