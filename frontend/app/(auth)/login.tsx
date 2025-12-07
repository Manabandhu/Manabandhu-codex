import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, TextField } from '@manabandhu/ui/components';
import { useLogin } from '../../src/hooks/useAuth';
import { useAuthStore } from '@manabandhu/utils/state/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default function LoginScreen() {
  const router = useRouter();
  const setPending = useAuthStore((s) => s.setPendingProvider);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });
  const login = useLogin();

  const onSubmit = handleSubmit(async (values) => {
    await login.mutateAsync(values);
    router.replace('/(main)/');
  });

  const socialAuth = (provider: string) => {
    setPending(provider);
    // In production integrate Firebase Auth for provider-specific flow.
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <Card className="gap-4">
        <Text className="text-2xl font-semibold text-primary">Welcome to ManaBandhu</Text>
        <Text className="text-gray-600">Connect, find rooms, rides, jobs, and community.</Text>
        <TextField
          control={control}
          name="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />
        <TextField
          control={control}
          name="password"
          label="Password"
          secureTextEntry
          placeholder="•••••••"
          error={errors.password?.message}
        />
        <Button label={login.isPending ? 'Signing in...' : 'Login'} onPress={onSubmit} />
        <View className="flex-row justify-between">
          <Button variant="secondary" label="Google" onPress={() => socialAuth('google')} />
          <Button variant="secondary" label="Apple" onPress={() => socialAuth('apple')} />
        </View>
        <View className="flex-row justify-between">
          <Button variant="secondary" label="Instagram" onPress={() => socialAuth('instagram')} />
          <Button variant="secondary" label="OTP" onPress={() => socialAuth('otp')} />
        </View>
      </Card>
    </ScrollView>
  );
}
