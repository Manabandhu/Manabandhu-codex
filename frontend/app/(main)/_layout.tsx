import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/utils/state/auth';

export default function MainLayout() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace('/(auth)/login');
    }
  }, [token, router]);

  return <Stack />;
}
