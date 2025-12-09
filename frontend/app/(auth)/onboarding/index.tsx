import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextField } from '@manabandhu/ui/components';
import { useOnboarding } from '../../src/hooks/useAuth';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  country: z.string().min(1, 'Please select your country'),
  purposes: z.array(z.string()).min(1, 'Please select at least one option')
});

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
  'France', 'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'
];

const purposeOptions = [
  { id: 'student', label: 'Student' },
  { id: 'professional', label: 'Professional' },
  { id: 'family', label: 'Family Member' },
  { id: 'tourist', label: 'Tourist' }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const onboarding = useOnboarding();
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({ 
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      country: '',
      purposes: []
    }
  });

  const togglePurpose = (purposeId: string) => {
    const newPurposes = selectedPurposes.includes(purposeId)
      ? selectedPurposes.filter(p => p !== purposeId)
      : [...selectedPurposes, purposeId];
    
    setSelectedPurposes(newPurposes);
    setValue('purposes', newPurposes, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await onboarding.mutateAsync(values);
      router.replace('/(main)/');
    } catch (error: any) {
      console.error('Onboarding error:', error);
      Alert.alert('Error', 'Failed to save onboarding data. Please try again.');
    }
  });

  const skipOnboarding = () => {
    router.replace('/(main)/');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Header */}
      <View className="px-6 pt-12 pb-4 border-b border-gray-200">
        <Text className="text-gray-500 text-xs text-center mb-2">Step 1 of 4</Text>
        <View className="flex-row space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <View key={step} className="flex-1 h-1 bg-gray-200 rounded">
              {step === 1 && <View className="h-full bg-indigo-600 rounded" />}
            </View>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="py-8 items-center">
          <Text className="text-gray-900 text-3xl font-bold text-center mb-2">
            Welcome to {'\n'}ManaBandhu!
          </Text>
          <Text className="text-gray-500 text-base text-center">
            Let's personalize your experience
          </Text>
        </View>

        {/* Illustration */}
        <View className="items-center mb-8">
          <View className="w-48 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl items-center justify-center">
            <View className="flex-row space-x-4">
              <View className="w-12 h-12 bg-indigo-500 rounded-full" />
              <View className="w-12 h-12 bg-orange-500 rounded-full" />
              <View className="w-12 h-12 bg-indigo-500 rounded-full" />
            </View>
            <View className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mt-4" />
          </View>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Full Name */}
          <View>
            <Text className="text-gray-800 font-semibold text-sm mb-2">Full Name</Text>
            <TextField
              control={control}
              name="fullName"
              placeholder="Enter your full name"
              error={errors.fullName?.message}
              leftIcon={<Ionicons name="person-outline" size={20} color="#6b7280" />}
            />
          </View>

          {/* Country */}
          <View>
            <Text className="text-gray-800 font-semibold text-sm mb-2">Country</Text>
            <View className="relative">
              <View className="absolute left-4 top-4 z-10">
                <Ionicons name="globe-outline" size={20} color="#6b7280" />
              </View>
              <TextField
                control={control}
                name="country"
                placeholder="Select your country"
                error={errors.country?.message}
                leftIcon={<Ionicons name="globe-outline" size={20} color="#6b7280" />}
              />
              <View className="absolute right-4 top-4">
                <Ionicons name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
          </View>

          {/* Purpose */}
          <View>
            <Text className="text-gray-800 font-semibold text-sm mb-4">
              I am here as a (select all that apply)
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {purposeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => togglePurpose(option.id)}
                  className={`flex-1 min-w-[45%] py-3 px-4 rounded-2xl border-2 ${
                    selectedPurposes.includes(option.id)
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text className={`text-center font-medium ${
                    selectedPurposes.includes(option.id)
                      ? 'text-indigo-600'
                      : 'text-gray-800'
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.purposes && (
              <Text className="text-red-600 text-sm mt-2">{errors.purposes.message}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="px-6 py-4 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={skipOnboarding}>
            <Text className="text-gray-500 text-sm">Skip for now</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          label={onboarding.isPending ? 'Saving...' : 'Continue'}
          onPress={onSubmit}
          disabled={!isValid || onboarding.isPending}
          className={`py-3 rounded-2xl ${isValid && !onboarding.isPending ? 'bg-indigo-600' : 'bg-gray-300'}`}
        />
      </View>
    </View>
  );
}