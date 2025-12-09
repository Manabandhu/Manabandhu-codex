import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '@/components/ui';
import { useHealthStore } from '@/utils/state/health';

export default function DoctorsScreen() {
  const doctors = useHealthStore((s) => s.doctors);
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Find Doctors</Text>
      {doctors.map((doc) => (
        <Card key={doc.id} className="mb-3">
          <Text className="font-semibold text-lg">{doc.name}</Text>
          <Text className="text-gray-600">{doc.specialty}</Text>
          <Text className="text-primary-500">⭐ {doc.rating}</Text>
          <Text className="text-gray-500">{doc.location}</Text>
          {doc.telemedicine && <Text className="text-accent-500">📹 Telemedicine Available</Text>}
          <Button label="Book Appointment" variant="primary" className="mt-2" />
        </Card>
      ))}
    </ScrollView>
  );
}
