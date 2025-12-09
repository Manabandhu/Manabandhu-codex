import { View, Text, ScrollView } from 'react-native';
import { Card, Button, TextField } from '@/components/ui';
import { useState } from 'react';

export default function RoomSearchScreen() {
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Search Rooms</Text>
      <TextField label="Location" value={location} onChangeText={setLocation} placeholder="Enter city or zip" />
      <TextField label="Max Price" value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
      <Button label="🗺️ Map View" variant="secondary" className="my-2" />
      <Button label="🤝 Roommate Matching" variant="secondary" className="mb-2" />
      <Button label="Search" variant="primary" />
      <Card className="mt-4">
        <Text className="font-semibold">✓ Verified Listings Only</Text>
      </Card>
    </ScrollView>
  );
}
