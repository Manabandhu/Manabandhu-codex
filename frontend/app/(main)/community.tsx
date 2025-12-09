import { ScrollView, Text, View } from 'react-native';
import { Card, Button } from '@/components/ui';
import { useCommunityStore } from '@/utils/state/community';

export default function CommunityScreen() {
  const rooms = useCommunityStore((s) => s.rooms);
  const events = useCommunityStore((s) => s.events);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Community Rooms</Text>
        {rooms.length === 0 && <Text className="text-gray-500">Create or join interest-based rooms.</Text>}
        {rooms.map((room) => (
          <View key={room.id} className="flex-row justify-between">
            <View>
              <Text className="font-medium">{room.name}</Text>
              <Text className="text-gray-500">{room.topic}</Text>
            </View>
            <Text className="text-primary">{room.memberCount} members</Text>
          </View>
        ))}
        <Button label="Start a room" variant="secondary" />
      </Card>

      <Card className="gap-3">
        <Text className="text-xl font-semibold">Events</Text>
        {events.length === 0 && <Text className="text-gray-500">Host meetups, seminars, and cultural events.</Text>}
        {events.map((event) => (
          <View key={event.id}>
            <Text className="font-medium">{event.title}</Text>
            <Text className="text-gray-500">{event.location}</Text>
          </View>
        ))}
        <Button label="Create event" variant="secondary" />
      </Card>
    </ScrollView>
  );
}
