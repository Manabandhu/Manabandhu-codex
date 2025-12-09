import { useRouter } from 'expo-router';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@manabandhu/utils/state/auth';

export default function SignupScreen() {
  const router = useRouter();
  const setPending = useAuthStore((s) => s.setPendingProvider);

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
          <Text className="text-white text-3xl font-bold mb-2">Join ManaBandhu</Text>
          <Text className="text-white/80 text-base text-center">
            Connect with your community
          </Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <ScrollView className="flex-1 -mt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-white rounded-t-3xl px-6 pt-8 min-h-full">
          <View className="space-y-6">
            <Text className="text-gray-900 text-xl font-semibold">Get Started</Text>

            <TouchableOpacity 
              onPress={() => router.push('/(auth)/signup/email')}
              className="flex-row items-center justify-center py-3 px-4 rounded-2xl bg-indigo-600"
            >
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text className="ml-3 text-white font-semibold">Sign up with Email</Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-4 text-gray-500 text-sm">Or continue with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <View className="flex-row flex-wrap gap-3">
              <TouchableOpacity 
                onPress={() => socialAuth('google')}
                className="flex-1 min-w-[160px] flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-2xl bg-white"
              >
                <Ionicons name="logo-google" size={24} color="#4285f4" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('facebook')}
                className="flex-1 min-w-[160px] flex-row items-center justify-center py-3 px-4 rounded-2xl bg-blue-600"
              >
                <Ionicons name="logo-facebook" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('apple')}
                className="flex-1 min-w-[160px] flex-row items-center justify-center py-3 px-4 rounded-2xl bg-black"
              >
                <Ionicons name="logo-apple" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => socialAuth('phone')}
                className="flex-1 min-w-[160px] flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-2xl bg-gray-50"
              >
                <Ionicons name="call-outline" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View className="mt-8">
              <Text className="text-gray-500 text-xs text-center leading-5">
                By continuing, you agree to our{' '}
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-indigo-600 font-medium">Terms of Service</Text>
                </TouchableOpacity>
                {' '}and{' '}
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-indigo-600 font-medium">Privacy Policy</Text>
                </TouchableOpacity>
              </Text>
            </View>

            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text className="text-indigo-600 font-semibold text-sm">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}