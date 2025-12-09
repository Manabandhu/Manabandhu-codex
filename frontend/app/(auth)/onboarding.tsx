import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/hooks/useAuth';

export default function Onboarding() {
  const router = useRouter();
  const onboarding = useOnboarding();

  const handleComplete = () => {
    onboarding.mutate({}, {
      onSuccess: () => router.replace('/(main)'),
    });
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold mb-4">Welcome to ManaBandhu!</Text>
      <Text className="text-gray-600 mb-8">Let's set up your profile</Text>

      <TouchableOpacity onPress={handleComplete} className="bg-blue-600 rounded-full py-4">
        <Text className="text-white text-center font-bold text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
