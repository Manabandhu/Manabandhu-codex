import { ScrollView, Text, View } from 'react-native';
import { Card, Button } from '@/components/ui';
import { useImmigrationStore } from '@/utils/state/immigration';

export default function ImmigrationScreen() {
  const resources = useImmigrationStore((s) => s.resources);
  const cases = useImmigrationStore((s) => s.cases);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Immigration Help</Text>
        {resources.length === 0 && <Text className="text-gray-500">Guides for visas, status, and documents.</Text>}
        {resources.map((r) => (
          <View key={r.id}>
            <Text className="font-medium">{r.title}</Text>
            <Text className="text-gray-500">{r.category}</Text>
          </View>
        ))}
        <Button label="Add resource" variant="secondary" />
      </Card>

      <Card className="gap-3">
        <Text className="text-xl font-semibold">My Questions</Text>
        {cases.length === 0 && <Text className="text-gray-500">Submit questions for advisors or community.</Text>}
        {cases.map((c) => (
          <View key={c.id}>
            <Text className="font-medium">{c.question}</Text>
            <Text className="text-gray-500">Status: {c.status}</Text>
          </View>
        ))}
        <Button label="Ask a question" variant="secondary" />
      </Card>
    </ScrollView>
  );
}
