import { View, Text, ScrollView } from 'react-native';
import { Card } from '@manabandhu/ui/components';
import { useAIStore } from '@manabandhu/utils/state/ai';

export default function RecommendationsScreen() {
  const recommendations = useAIStore((s) => s.recommendations);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">For You</Text>
      {recommendations.map((rec) => (
        <Card key={rec.itemId} className="mb-3">
          <Text className="font-semibold text-lg">{rec.type.toUpperCase()}</Text>
          <Text className="text-gray-600">{rec.reason}</Text>
          <Text className="text-primary-500">Match: {(rec.score * 100).toFixed(0)}%</Text>
        </Card>
      ))}
    </ScrollView>
  );
}
