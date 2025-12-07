import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@manabandhu/ui/components';

export default function DietScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Diet Planner</Text>
      <Card className="mb-3">
        <Text className="font-semibold text-lg">Daily Target</Text>
        <Text className="text-accent-500 text-3xl font-bold">2000 cal</Text>
      </Card>
      <Card className="mb-3">
        <Text className="font-semibold text-lg mb-2">Today's Meals</Text>
        <View className="py-2 border-b border-gray-100">
          <Text className="font-medium">Breakfast</Text>
          <Text className="text-gray-500">Oatmeal - 300 cal</Text>
        </View>
      </Card>
      <Button label="Add Meal" variant="primary" />
    </ScrollView>
  );
}
