import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useLogin } from '@/hooks/useAuth';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const login = useLogin();

  const handleLogin = () => {
    login.mutate({ email, password }, {
      onSuccess: () => router.replace('/(main)'),
    });
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-purple-100 to-white">
      <View className="flex-1 justify-center px-6">
        <Image source={require('@/assets/logo.png')} className="w-24 h-24 self-center mb-4" />
        <Text className="text-3xl font-bold text-center mb-2">Welcome back</Text>
        <Text className="text-gray-600 text-center mb-8">Sign in to your ManaBandhu account</Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border border-gray-200">
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

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Password</Text>
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border border-gray-200">
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

        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
            <View className={`w-5 h-5 rounded border ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
            <Text className="ml-2 text-gray-700">Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
            <Text className="text-blue-600 font-semibold">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} className="bg-blue-600 rounded-full py-4 mb-6">
          <Text className="text-white text-center font-bold text-lg">Sign in</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 mb-4">Or continue with</Text>

        <TouchableOpacity className="bg-white rounded-full py-4 mb-3 flex-row items-center justify-center border border-gray-200">
          <Text className="font-semibold ml-2">Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-blue-600 rounded-full py-4 mb-3 flex-row items-center justify-center">
          <Text className="text-white font-semibold ml-2">Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-black rounded-full py-4 flex-row items-center justify-center">
          <Text className="text-white font-semibold ml-2">Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
