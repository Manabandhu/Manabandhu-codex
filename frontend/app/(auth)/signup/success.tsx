import { useRouter } from 'expo-router';
import { SuccessScreen } from '@manabandhu/ui';

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <SuccessScreen
      onExplore={() => router.replace('/(main)')}
      onTour={() => router.push('/onboarding/interests')}
    />
  );
}
