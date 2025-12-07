import { View, Text, ScrollView } from 'react-native';
import { Card } from '@manabandhu/ui/components';

export default function FestivalsScreen() {
  const festivals = [
    { id: '1', name: 'Diwali', date: '2024-11-01', description: 'Festival of Lights' },
    { id: '2', name: 'Eid', date: '2024-04-10', description: 'Celebration of faith' }
  ];
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">🎉 Festival Calendar</Text>
      {festivals.map((fest) => (
        <Card key={fest.id} className="mb-3">
          <Text className="font-semibold text-lg">{fest.name}</Text>
          <Text className="text-accent-500">{fest.date}</Text>
          <Text className="text-gray-600">{fest.description}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}
