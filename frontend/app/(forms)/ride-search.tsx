import { View, Text, ScrollView } from 'react-native';
import { Button, TextField, Card } from '@/components/ui';

export default function RideSearchScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Find a Ride</Text>
      <TextField label="From" placeholder="Starting location" />
      <TextField label="To" placeholder="Destination" />
      <TextField label="Date" placeholder="MM/DD/YYYY" />
      <Button label="🗺️ Route Preview" variant="secondary" className="my-2" />
      <Button label="💰 Cost Split Calculator" variant="secondary" className="mb-2" />
      <Button label="Search Rides" variant="primary" />
      <Card className="mt-4">
        <Text className="font-semibold text-lg">✈️ Trip Planner</Text>
        <Text className="text-gray-500">Plan multi-city trips</Text>
      </Card>
    </ScrollView>
  );
}
