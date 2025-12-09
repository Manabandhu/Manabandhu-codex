import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@/components/ui';
import { useMarketplaceStore } from '@/utils/state/marketplace';

export default function MarketplaceScreen() {
  const items = useMarketplaceStore((s) => s.items);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Marketplace</Text>
      <View className="flex-row gap-2 mb-4">
        <Button label="Buy" variant="primary" />
        <Button label="Sell" variant="secondary" />
        <Button label="Rent" variant="secondary" />
      </View>
      {items.map((item) => (
        <Card key={item.id} className="mb-3">
          <Text className="font-semibold text-lg">{item.title}</Text>
          <Text className="text-gray-500">{item.description}</Text>
          <Text className="text-accent-500 font-bold">${item.price}</Text>
        </Card>
      ))}
      <Link href="/marketplace/auctions" asChild>
        <Button label="View Auctions" variant="secondary" />
      </Link>
    </ScrollView>
  );
}
