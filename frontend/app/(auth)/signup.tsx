import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSignup } from '@/hooks/useAuth';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signup = useSignup();

  const handleSignup = () => {
    signup.mutate({ fullName, email, password }, {
      onSuccess: (data) => {
        if (data.requiresOnboarding) {
          router.push('/(auth)/onboarding');
        } else {
          router.replace('/(main)');
        }
      },
    });
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold mb-8">Create Account</Text>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3">
          <User size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your name"
            value={fullName}
            onChangeText={setFullName}
            className="flex-1 ml-3"
          />
        </View>
      </View>

      <View className="mb-4">
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

      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password</Text>
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3">
          <Lock size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="flex-1 ml-3"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleSignup} className="bg-blue-600 rounded-full py-4 mb-4">
        <Text className="text-white text-center font-bold text-lg">Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-center text-gray-600">
          Already have an account? <Text className="text-blue-600 font-semibold">Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
