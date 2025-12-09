import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button } from '@/components/ui';
import { useHealthStore } from '@/utils/state/health';

export default function HealthScreen() {
  const appointments = useHealthStore((s) => s.appointments);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Health & Wellness</Text>
      <View className="flex-row gap-2 mb-4">
        <Link href="/health/doctors" asChild><Button label="Find Doctors" /></Link>
        <Link href="/health/fitness" asChild><Button label="Fitness" variant="secondary" /></Link>
      </View>
      <Card className="mb-3">
        <Text className="font-semibold text-lg mb-2">Upcoming Appointments</Text>
        {appointments.length === 0 ? (
          <Text className="text-gray-500">No appointments scheduled</Text>
        ) : (
          appointments.map((apt) => (
            <View key={apt.id} className="py-2 border-b border-gray-100">
              <Text>{apt.date}</Text>
              <Text className="text-primary-500">{apt.type}</Text>
            </View>
          ))
        )}
      </Card>
      <Link href="/health/diet" asChild><Button label="Diet Planner" variant="secondary" /></Link>
    </ScrollView>
  );
}
