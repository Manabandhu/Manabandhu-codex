import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components/ui';

export default function VoiceSearchScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <Text className="text-6xl mb-4">🎤</Text>
      <Text className="text-2xl font-display font-bold text-primary-700 mb-2">Voice Search</Text>
      <Text className="text-gray-500 text-center mb-6">Tap to speak your query</Text>
      <Button label="Start Recording" variant="primary" />
    </View>
  );
}
