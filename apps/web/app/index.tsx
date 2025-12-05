import { Link } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';
import { useAuthStore } from '@manabandhu/utils/state/auth';
import { useCommunityStore } from '@manabandhu/utils/state/community';
import { useFinanceStore } from '@manabandhu/utils/state/finance';

export default function WebHome() {
  const user = useAuthStore((s) => s.user);
  const rooms = useCommunityStore((s) => s.rooms.slice(0, 2));
  const expenses = useFinanceStore((s) => s.expenses.slice(0, 2));

  return (
    <ScrollView style={{ padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#0F766E', marginBottom: 12 }}>
        {user ? `Welcome back, ${user.name}` : 'ManaBandhu Web'}
      </Text>
      <Card className="gap-3">
        <Text className="text-lg font-medium">Community tools</Text>
        <View className="flex-row gap-2">
          <Link href="/room-listing" asChild>
            <Button label="List a room" />
          </Link>
          <Link href="/job-posting" asChild>
            <Button variant="secondary" label="Post a job" />
          </Link>
        </View>
        <Link href="/ride-offer" asChild>
          <Button variant="secondary" label="Offer a ride" />
        </Link>
      </Card>

      <Card className="gap-3">
        <Text className="text-lg font-medium">Community</Text>
        {rooms.length === 0 ? (
          <Text className="text-gray-500">Join discussion rooms and events.</Text>
        ) : (
          rooms.map((room) => (
            <View key={room.id} className="flex-row justify-between">
              <Text>{room.name}</Text>
              <Text className="text-primary">{room.memberCount} members</Text>
            </View>
          ))
        )}
        <Link href="/community" asChild>
          <Button variant="secondary" label="Community" />
        </Link>
      </Card>

      <Card className="gap-3">
        <Text className="text-lg font-medium">Finance</Text>
        {expenses.length === 0 ? (
          <Text className="text-gray-500">Track expenses and wallets.</Text>
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
        <Link href="/finance" asChild>
          <Button variant="secondary" label="Finance tools" />
        </Link>
      </Card>
    </ScrollView>
  );
}
