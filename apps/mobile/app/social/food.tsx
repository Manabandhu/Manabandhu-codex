import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';

export default function FoodScreen() {
  const restaurants = [
    { id: '1', name: 'Curry House', cuisine: 'Indian', rating: 4.5 },
    { id: '2', name: 'Biryani Palace', cuisine: 'Pakistani', rating: 4.8 }
  ];
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">🍛 Desi Food</Text>
      {restaurants.map((rest) => (
        <Card key={rest.id} className="mb-3">
          <Text className="font-semibold text-lg">{rest.name}</Text>
          <Text className="text-gray-600">{rest.cuisine}</Text>
          <Text className="text-accent-500">⭐ {rest.rating}</Text>
          <Button label="Order Now" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
