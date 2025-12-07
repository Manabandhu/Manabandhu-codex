import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@manabandhu/ui/components';

export default function ImmigrationEnhancedScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Immigration Help</Text>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">📰 Visa News & Updates</Text>
        <Text className="text-gray-500">Latest immigration policy changes</Text>
        <Button label="Read More" variant="secondary" className="mt-2" />
      </Card>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">📋 Document Templates</Text>
        <Text className="text-gray-500">Download visa application templates</Text>
        <Button label="Browse Templates" variant="secondary" className="mt-2" />
      </Card>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">⚖️ Lawyer Booking</Text>
        <Text className="text-gray-500">Consult immigration lawyers</Text>
        <Button label="Find Lawyers" variant="secondary" className="mt-2" />
      </Card>
      <Card>
        <Text className="font-semibold text-lg">📊 Visa Status Tracking</Text>
        <Text className="text-gray-500">Track your application status</Text>
        <Button label="Track Status" variant="primary" className="mt-2" />
      </Card>
    </ScrollView>
  );
}
