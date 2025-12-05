import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/api/queryClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(main)/index" options={{ title: 'Home' }} />
            <Stack.Screen name="(forms)/room-listing" options={{ title: 'Create Listing' }} />
            <Stack.Screen name="(forms)/job-posting" options={{ title: 'Post Job' }} />
            <Stack.Screen name="(forms)/ride-offer" options={{ title: 'Offer Ride' }} />
            <Stack.Screen name="(main)/community" options={{ title: 'Community' }} />
            <Stack.Screen name="(main)/finance" options={{ title: 'Finance' }} />
            <Stack.Screen name="(main)/immigration" options={{ title: 'Immigration Help' }} />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
