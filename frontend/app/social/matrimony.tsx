import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';

export default function MatrimonyScreen() {
  const profiles = [
    { id: '1', name: 'Profile 1', age: 28, profession: 'Engineer', location: 'NYC' },
    { id: '2', name: 'Profile 2', age: 26, profession: 'Doctor', location: 'SF' }
  ];
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">💑 Matrimony</Text>
      {profiles.map((profile) => (
        <Card key={profile.id} className="mb-3">
          <Text className="font-semibold text-lg">{profile.name}</Text>
          <Text className="text-gray-600">{profile.age} years • {profile.profession}</Text>
          <Text className="text-primary-500">{profile.location}</Text>
          <Button label="View Profile" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
