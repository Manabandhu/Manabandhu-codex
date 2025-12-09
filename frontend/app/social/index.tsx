import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@/components/ui';

export default function SocialScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Social & Culture</Text>
      <Link href="/social/groups" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">👥 Community Groups</Text>
          <Text className="text-gray-500">Join local communities</Text>
        </Card>
      </Link>
      <Link href="/social/festivals" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🎉 Festival Calendar</Text>
          <Text className="text-gray-500">Upcoming celebrations</Text>
        </Card>
      </Link>
      <Link href="/social/food" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🍛 Desi Food Delivery</Text>
          <Text className="text-gray-500">Order authentic cuisine</Text>
        </Card>
      </Link>
      <Link href="/social/matrimony" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">💑 Matrimony</Text>
          <Text className="text-gray-500">Find your match</Text>
        </Card>
      </Link>
    </ScrollView>
  );
}
