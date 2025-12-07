import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@manabandhu/ui/components';

export default function AIScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">AI Tools</Text>
      <Link href="/ai/chat" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🤖 AI Assistant</Text>
          <Text className="text-gray-500">Chat with AI for help</Text>
        </Card>
      </Link>
      <Link href="/ai/recommendations" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">✨ Smart Recommendations</Text>
          <Text className="text-gray-500">Personalized suggestions</Text>
        </Card>
      </Link>
      <Link href="/ai/voice" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🎤 Voice Search</Text>
          <Text className="text-gray-500">Search by speaking</Text>
        </Card>
      </Link>
      <Link href="/ai/astrology" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🔮 AI Astrology</Text>
          <Text className="text-gray-500">Daily predictions</Text>
        </Card>
      </Link>
    </ScrollView>
  );
}
