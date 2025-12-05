import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-xl font-semibold mb-2">Something went wrong</Text>
      <Text className="text-gray-600 mb-4">{error.message}</Text>
      <Link href="/(auth)/login" replace className="text-primary mb-2">
        Go to login
      </Link>
      <Text onPress={retry} className="text-blue-600">
        Retry
      </Text>
    </View>
  );
}
