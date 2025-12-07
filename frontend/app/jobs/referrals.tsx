import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';

export default function ReferralsScreen() {
  const referrals = [
    { id: '1', company: 'Google', position: 'SWE', referrer: 'John D.' },
    { id: '2', company: 'Amazon', position: 'PM', referrer: 'Sarah K.' }
  ];
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Referrals Network</Text>
      {referrals.map((ref) => (
        <Card key={ref.id} className="mb-3">
          <Text className="font-semibold text-lg">{ref.company}</Text>
          <Text className="text-gray-600">{ref.position}</Text>
          <Text className="text-primary-500">Referrer: {ref.referrer}</Text>
          <Button label="Request Referral" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
