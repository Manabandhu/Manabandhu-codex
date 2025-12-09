import { View, Text, ScrollView } from 'react-native';
import { Button, TextField } from '@/components/ui';

export default function ResumeBuilderScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">AI Resume Builder</Text>
      <TextField label="Full Name" />
      <TextField label="Email" />
      <TextField label="Phone" />
      <TextField label="Skills" placeholder="Comma separated" />
      <TextField label="Experience" multiline numberOfLines={4} />
      <Button label="Generate Resume" variant="primary" className="mt-4" />
    </ScrollView>
  );
}
