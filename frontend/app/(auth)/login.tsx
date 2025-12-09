import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextField } from '@manabandhu/ui/components';
import { useLogin } from '../../src/hooks/useAuth';
import { useAuthStore } from '@manabandhu/utils/state/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default function LoginScreen() {
  const router = useRouter();
  const setPending = useAuthStore((s) => s.setPendingProvider);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });
  const login = useLogin();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await login.mutateAsync(values);
      if (rememberMe) {
        // TODO: Persist credentials securely
      }
      router.replace('/(main)/');
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error?.response?.status === 401 
        ? 'Invalid email or password'
        : 'Network error. Please try again.';
      Alert.alert('Login Failed', message);
    }
  });

  const socialAuth = (provider: string) => {
    setPending(provider);
    // In production integrate Firebase Auth for provider-specific flow.
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-70 relative"
      >
        <View className="absolute top-12 left-0 w-25 h-25 bg-white/10 rounded-full -translate-x-7" />
        <View className="absolute -top-12 right-0 w-25 h-25 bg-white/8 rounded-full translate-x-12" />
        
        <View className="flex-1 justify-center items-center px-6">
          <Image 
            source={require('../../assets/icon.png')} 
            className="w-20 h-20 mb-4"
          />
          <Text className="text-white text-3xl font-bold mb-2">Welcome back</Text>
          <Text className="text-white/80 text-base text-center">
            Sign in to your ManaBandhu account
          </Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <ScrollView className="flex-1 -mt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-white rounded-t-3xl px-6 pt-8 min-h-full">
          <View className="space-y-6">
            <TextField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              leftIcon={<Ionicons name="mail-outline" size={20} color="#6b7280" />}
            />
            
            <TextField
              control={control}
              name="password"
              label="Password"
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              error={errors.password?.message}
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6b7280" />
                </TouchableOpacity>
              }
            />

            <View className="flex-row justify-between items-center">
              <TouchableOpacity 
                className="flex-row items-center" 
                onPress={() => setRememberMe(!rememberMe)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: rememberMe }}
                accessibilityLabel="Remember me"
              >
                <View className={`w-5 h-5 border-2 rounded mr-3 ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'}`}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
                </View>
                <Text className="text-gray-700 text-sm">Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(auth)/password-reset/')}>
                <Text className="text-indigo-600 text-sm font-semibold">Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button 
              label={login.isPending ? 'Signing in...' : 'Sign in'} 
              onPress={onSubmit}
              className="bg-indigo-600 py-4 rounded-2xl"
            />

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-4 text-gray-500 text-sm">Or continue with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <View className="space-y-3">
              <TouchableOpacity 
                onPress={() => socialAuth('google')}
                className="flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-2xl bg-white"
              >
                <Ionicons name="logo-google" size={20} color="#4285f4" />
                <Text className="ml-3 text-gray-900 font-medium">Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('facebook')}
                className="flex-row items-center justify-center py-3 px-4 rounded-2xl bg-blue-600"
              >
                <Ionicons name="logo-facebook" size={20} color="white" />
                <Text className="ml-3 text-white font-medium">Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('apple')}
                className="flex-row items-center justify-center py-3 px-4 rounded-2xl bg-black"
              >
                <Ionicons name="logo-apple" size={20} color="white" />
                <Text className="ml-3 text-white font-medium">Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('phone')}
                className="flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-2xl bg-gray-50"
              >
                <Ionicons name="call-outline" size={20} color="#374151" />
                <Text className="ml-3 text-gray-900 font-medium">Continue with Phone Number</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600 text-sm">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup/')}>
                <Text className="text-indigo-600 font-semibold text-sm">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
