import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/api/queryClient';
import '../global.css';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'ManaBandhu' }} />
        <Stack.Screen name="room-listing" options={{ title: 'Create Listing' }} />
        <Stack.Screen name="job-posting" options={{ title: 'Post Job' }} />
        <Stack.Screen name="ride-offer" options={{ title: 'Offer Ride' }} />
        <Stack.Screen name="community" options={{ title: 'Community' }} />
        <Stack.Screen name="finance" options={{ title: 'Finance Tools' }} />
        <Stack.Screen name="immigration" options={{ title: 'Immigration Help' }} />
      </Stack>
    </QueryClientProvider>
  );
}
