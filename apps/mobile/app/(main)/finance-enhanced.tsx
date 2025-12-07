import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@manabandhu/ui/components';
import { useFinanceStore } from '@manabandhu/utils/state/finance';

export default function FinanceEnhancedScreen() {
  const expenses = useFinanceStore((s) => s.expenses);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Finance Tools</Text>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">Daily Expenses</Text>
        <Text className="text-accent-500 text-3xl font-bold">$150</Text>
        <Button label="Add Expense" variant="secondary" className="mt-2" />
      </Card>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">Group Wallets</Text>
        <Text className="text-gray-500">Shared Apartment: $500</Text>
        <Button label="Manage Wallets" variant="secondary" className="mt-2" />
      </Card>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">Currency Converter</Text>
        <Button label="Convert" variant="primary" className="mt-2" />
      </Card>
      <Card>
        <Text className="font-semibold text-lg">Reports & Analytics</Text>
        <Button label="View Reports" variant="secondary" className="mt-2" />
      </Card>
    </ScrollView>
  );
}
