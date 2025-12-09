import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@/components/ui';

export default function GroupsScreen() {
  const groups = [
    { id: '1', name: 'Desi Food Lovers', members: 250, description: 'Share recipes and restaurant reviews' },
    { id: '2', name: 'Cricket Fans', members: 180, description: 'Discuss matches and organize games' }
  ];
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Community Groups</Text>
      {groups.map((group) => (
        <Card key={group.id} className="mb-3">
          <Text className="font-semibold text-lg">{group.name}</Text>
          <Text className="text-gray-600">{group.description}</Text>
          <Text className="text-primary-500">{group.members} members</Text>
          <Button label="Join Group" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
