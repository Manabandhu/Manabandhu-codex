import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TextField } from '@manabandhu/ui/components';

const schema = z.object({
  phone: z.string().min(10, 'Valid phone number required')
});

export default function PhoneSignupScreen() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState('+1');
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ 
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = handleSubmit(async (values) => {
    // Handle phone verification logic
    console.log('Phone:', countryCode + values.phone);
    router.push('/(auth)/verify-code');
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-46 relative"
      >
        <View className="absolute top-12 left-0 w-25 h-25 bg-white/10 rounded-full -translate-x-7" />
        <View className="absolute -top-12 right-0 w-15 h-15 bg-white/8 rounded-full translate-x-7" />
        
        <View className="flex-1 justify-center items-center px-6">
          <Image 
            source={require('../../../assets/icon.png')} 
            className="w-15 h-15 mb-3"
          />
          <Text className="text-white text-2xl font-bold">Verify Phone</Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <ScrollView className="flex-1 -mt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-white rounded-t-3xl px-6 pt-6 min-h-full">
          <Text className="text-gray-600 text-center mb-2">Enter your mobile number</Text>
          <Text className="text-gray-500 text-sm text-center mb-8">We'll send a 6-digit verification code</Text>
          
          <View className="space-y-6">
            <View className="relative">
              <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-3">
                <TouchableOpacity className="flex-row items-center mr-4">
                  <View className="w-6 h-6 bg-red-600 rounded mr-2 flex items-center justify-center">
                    <View className="w-4 h-3 bg-white rounded-sm" />
                  </View>
                  <Text className="text-gray-900 font-medium mr-1">{countryCode}</Text>
                  <Ionicons name="chevron-down" size={12} color="#6b7280" />
                </TouchableOpacity>
                
                <View className="w-px h-6 bg-gray-300 mr-4" />
                
                <Ionicons name="call-outline" size={20} color="#6b7280" className="mr-3" />
                
                <TextField
                  control={control}
                  name="phone"
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  className="flex-1 text-lg"
                  style={{ borderWidth: 0, paddingHorizontal: 0 }}
                />
              </View>
              
              {errors.phone && (
                <Text className="text-red-500 text-sm mt-1">{errors.phone.message}</Text>
              )}
            </View>

            <View className="bg-blue-50 rounded-xl p-4 flex-row items-center">
              <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
              <Text className="text-gray-600 text-sm ml-3">Standard SMS rates may apply</Text>
            </View>

            <TouchableOpacity 
              onPress={onSubmit}
              disabled={!isValid}
              className={`py-4 rounded-2xl mt-6 ${
                isValid ? 'bg-indigo-600' : 'bg-gray-400'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Send Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/(auth)/email-signup')}
              className="mt-6"
            >
              <Text className="text-indigo-600 text-center font-semibold">
                Use email instead
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.back()}
              className="mt-8"
            >
              <Text className="text-gray-500 text-center font-medium">
                ← Back to sign up options
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}