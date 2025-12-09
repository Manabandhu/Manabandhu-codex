import { Link } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@/components/ui';
import { useAuthStore } from '@/utils/state/auth';
import { useRoomsStore } from '@/utils/state/rooms';
import { useRidesStore } from '@/utils/state/rides';
import { useFinanceStore } from '@/utils/state/finance';
import { useCommunityStore } from '@/utils/state/community';
import { useImmigrationStore } from '@/utils/state/immigration';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const savedRooms = useRoomsStore((s) => s.saved);
  const rides = useRidesStore((s) => s.items.slice(0, 3));
  const expenses = useFinanceStore((s) => s.expenses.slice(-3));
  const community = useCommunityStore((s) => s.rooms.slice(0, 2));
  const immigrationCases = useImmigrationStore((s) => s.cases.slice(0, 2));

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text className="text-2xl font-semibold text-primary">
        {user ? `Hi ${user.name}` : 'ManaBandhu'}
      </Text>
      <Card className="gap-3">
        <Text className="text-lg font-medium">Get Started</Text>
        <View className="flex-row gap-2">
          <Link href="/(forms)/room-listing" asChild>
            <Button label="List a room" />
          </Link>
          <Link href="/(forms)/job-posting" asChild>
            <Button variant="secondary" label="Post a job" />
          </Link>
        </View>
        <Link href="/(forms)/ride-offer" asChild>
          <Button variant="secondary" label="Offer a ride" />
        </Link>
      </Card>

      <Card className="gap-2">
        <Text className="text-lg font-medium">Community</Text>
        {community.length === 0 ? (
          <Text className="text-gray-500">Join rooms and events to see updates.</Text>
        ) : (
          community.map((room) => (
            <View key={room.id} className="flex-row justify-between">
              <Text>{room.name}</Text>
              <Text className="text-primary">{room.memberCount} members</Text>
            </View>
          ))
        )}
        <Link href="/(main)/community" asChild>
          <Button variant="secondary" label="Open community" />
        </Link>
      </Card>

      <Card className="gap-2">
        <Text className="text-lg font-medium">Saved Rooms</Text>
        {savedRooms.length === 0 ? (
          <Text className="text-gray-500">Save listings to see them here.</Text>
        ) : (
          savedRooms.map((room) => (
            <View key={room.id} className="flex-row justify-between">
              <Text>{room.title}</Text>
              <Text className="text-primary">${room.price}</Text>
            </View>
          ))
        )}
      </Card>

      <Card className="gap-2">
        <Text className="text-lg font-medium">Upcoming Rides</Text>
        {rides.length === 0 ? (
          <Text className="text-gray-500">Offer or request a ride to get updates.</Text>
        ) : (
          rides.map((ride) => (
            <View key={ride.id} className="flex-row justify-between">
              <Text>{ride.route}</Text>
              <Text className="text-primary">{ride.time}</Text>
            </View>
          ))
        )}
      </Card>

      <Card className="gap-2">
        <Text className="text-lg font-medium">Finance</Text>
        {expenses.length === 0 ? (
          <Text className="text-gray-500">Track expenses and shared wallets.</Text>
        ) : (
          expenses.map((e) => (
            <View key={e.id} className="flex-row justify-between">
              <Text>{e.description}</Text>
              <Text className="text-primary">
                {e.amount} {e.currency}
              </Text>
            </View>
          ))
        )}
        <Link href="/(main)/finance" asChild>
          <Button variant="secondary" label="Open finance tools" />
        </Link>
      </Card>

      <Card className="gap-2">
        <Text className="text-lg font-medium">Immigration Help</Text>
        {immigrationCases.length === 0 ? (
          <Text className="text-gray-500">Submit a case for guidance.</Text>
        ) : (
          immigrationCases.map((c) => (
            <View key={c.id} className="flex-row justify-between">
              <Text>{c.question}</Text>
              <Text className="text-primary">{c.status}</Text>
            </View>
          ))
        )}
        <Link href="/(main)/immigration" asChild>
          <Button variant="secondary" label="Get help" />
        </Link>
      </Card>
    </ScrollView>
  );
}
