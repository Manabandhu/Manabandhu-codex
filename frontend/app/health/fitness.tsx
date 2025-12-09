import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@/components/ui';
import { useHealthStore } from '@/utils/state/health';

export default function FitnessScreen() {
  const challenges = useHealthStore((s) => s.challenges);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Fitness Challenges</Text>
      {challenges.map((ch) => (
        <Card key={ch.id} className="mb-3">
          <Text className="font-semibold text-lg">{ch.title}</Text>
          <Text className="text-gray-600">{ch.goal}</Text>
          <Text className="text-primary-500">{ch.participants} participants</Text>
          <Button label="Join Challenge" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
