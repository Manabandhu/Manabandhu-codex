import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button, TextField } from '@/components/ui';

export default function JobSearchScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Job Search</Text>
      <TextField label="Keywords" placeholder="e.g. Software Engineer" />
      <TextField label="Location" placeholder="City or Remote" />
      <Button label="Search Jobs" variant="primary" className="my-3" />
      <Link href="/jobs/resume-builder" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">📄 AI Resume Builder</Text>
          <Text className="text-gray-500">Create professional resume</Text>
        </Card>
      </Link>
      <Link href="/jobs/mock-interview" asChild>
        <Card className="mb-3 active:opacity-80">
          <Text className="font-semibold text-lg">🎤 AI Mock Interview</Text>
          <Text className="text-gray-500">Practice with AI</Text>
        </Card>
      </Link>
      <Link href="/jobs/referrals" asChild>
        <Card className="active:opacity-80">
          <Text className="font-semibold text-lg">🤝 Referrals Network</Text>
          <Text className="text-gray-500">Get employee referrals</Text>
        </Card>
      </Link>
    </ScrollView>
  );
}
