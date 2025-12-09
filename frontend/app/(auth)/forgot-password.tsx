import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { usePasswordReset } from '@/hooks/useAuth';
import { Mail } from 'lucide-react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const resetPassword = usePasswordReset();

  const handleReset = () => {
    resetPassword.mutate({ email }, {
      onSuccess: () => router.back(),
    });
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold mb-2">Forgot Password?</Text>
      <Text className="text-gray-600 mb-8">Enter your email to reset your password</Text>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Email</Text>
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3">
          <Mail size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-3"
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleReset} className="bg-blue-600 rounded-full py-4 mb-4">
        <Text className="text-white text-center font-bold text-lg">Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-center text-blue-600 font-semibold">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
