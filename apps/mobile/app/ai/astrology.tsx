import { View, Text, ScrollView } from 'react-native';
import { Card } from '@manabandhu/ui/components';

export default function AstrologyScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">🔮 Daily Astrology</Text>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">Your Sign: Aries ♈</Text>
        <Text className="text-gray-600 mt-2">Today is a great day for new beginnings. Focus on your goals and stay positive.</Text>
      </Card>
      <Card>
        <Text className="font-semibold text-lg mb-2">Lucky Numbers</Text>
        <Text className="text-accent-500 text-2xl">7, 14, 21</Text>
      </Card>
    </ScrollView>
  );
}
