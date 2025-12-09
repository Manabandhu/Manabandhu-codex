import { View, Text, ScrollView } from 'react-native';
import { Button, Card } from '@/components/ui';

export default function MockInterviewScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">AI Mock Interview</Text>
      <Card className="mb-4">
        <Text className="font-semibold text-lg mb-2">Practice Interview Questions</Text>
        <Text className="text-gray-600">Get AI-powered feedback on your answers</Text>
      </Card>
      <Button label="Start Interview" variant="primary" />
    </ScrollView>
  );
}
