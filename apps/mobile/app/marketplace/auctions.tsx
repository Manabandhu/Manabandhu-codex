import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';
import { useMarketplaceStore } from '@manabandhu/utils/state/marketplace';

export default function AuctionsScreen() {
  const auctions = useMarketplaceStore((s) => s.auctions);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Live Auctions</Text>
      {auctions.map((auction) => (
        <Card key={auction.id} className="mb-3">
          <Text className="font-semibold">Item #{auction.itemId}</Text>
          <Text className="text-accent-500 font-bold">Current Bid: ${auction.currentBid}</Text>
          <Text className="text-gray-500">Ends: {auction.endTime}</Text>
          <Button label="Place Bid" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
