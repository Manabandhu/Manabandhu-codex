import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TextField } from '@manabandhu/ui/components';
import { useSignup } from '../../src/hooks/useAuth';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function EmailSignupScreen() {
  const router = useRouter();
  const signup = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ 
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const password = watch('password');
  
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return { strength, text: levels[strength] };
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!agreedToTerms) return;
    try {
      const response = await signup.mutateAsync({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password
      });
      if (response.requiresOnboarding) {
        router.push('/(auth)/onboarding/');
      } else {
        router.replace('/(main)/');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const message = error?.response?.data?.message || 'Unable to create account. Please try again.';
      Alert.alert('Signup Failed', message);
    }
  });

  const { strength, text } = getPasswordStrength();
  const isFormValid = isValid && agreedToTerms;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-45 relative"
      >
        <View className="absolute top-12 left-0 w-25 h-25 bg-white/10 rounded-full -translate-x-7" />
        <View className="absolute -top-12 right-0 w-15 h-15 bg-white/8 rounded-full translate-x-7" />
        
        <View className="flex-1 justify-center items-center px-6">
          <Image 
            source={require('../../assets/icon.png')} 
            className="w-15 h-15 mb-3"
          />
          <Text className="text-white text-2xl font-bold">Create Account</Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <ScrollView className="flex-1 -mt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-white rounded-t-3xl px-6 pt-6 min-h-full">
          <Text className="text-gray-500 text-center mb-6">Enter your details to get started</Text>
          
          <View className="space-y-4">
            <TextField
              control={control}
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullName?.message}
              leftIcon={<Ionicons name="person-outline" size={20} color="#6b7280" />}
            />
            
            <TextField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              leftIcon={<Ionicons name="mail-outline" size={20} color="#6b7280" />}
            />

            <View className="relative">
              <TextField
                control={control}
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                error={errors.phone?.message}
                leftIcon={
                  <View className="flex-row items-center">
                    <Text className="text-base mr-2">🇺🇸</Text>
                    <Text className="text-gray-700 font-medium mr-2">+1</Text>
                    <View className="w-px h-5 bg-gray-300" />
                  </View>
                }
              />
            </View>
            
            <View>
              <TextField
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                error={errors.password?.message}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                }
              />
              
              {password && (
                <View className="mt-2">
                  <View className="flex-row space-x-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <View
                        key={level}
                        className={`flex-1 h-1 rounded ${
                          level <= strength 
                            ? strength === 1 ? 'bg-red-500' 
                              : strength === 2 ? 'bg-yellow-500'
                              : strength === 3 ? 'bg-blue-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </View>
                  <Text className="text-xs text-gray-600">{text}</Text>
                </View>
              )}
            </View>
            
            <TextField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword?.message}
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity 
              className="flex-row items-start mt-6"
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 ${
                agreedToTerms ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'
              }`}>
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={12} color="white" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 text-sm leading-5">
                  I agree to the{' '}
                  <Text className="text-indigo-600 font-semibold">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-indigo-600 font-semibold">Privacy Policy</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onSubmit}
              disabled={!isFormValid || signup.isPending}
              className={`py-4 rounded-2xl mt-6 ${
                isFormValid && !signup.isPending ? 'bg-indigo-600' : 'bg-gray-400'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {signup.isPending ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.back()}
              className="mt-8"
            >
              <Text className="text-gray-500 text-center font-medium">
                Back to sign up options
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}