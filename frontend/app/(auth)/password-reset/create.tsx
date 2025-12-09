import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, FloatingTextField } from '@manabandhu/ui/components';

const schema = z.object({
  password: z.string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'One uppercase letter')
    .regex(/[0-9]/, 'One number')
    .regex(/[^A-Za-z0-9]/, 'One special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function CreatePasswordScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ 
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const password = watch('password', '');
  
  const requirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One number', met: /[0-9]/.test(password) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const getStrength = () => {
    const metCount = requirements.filter(req => req.met).length;
    if (metCount === 0) return { level: 0, text: '' };
    if (metCount === 1) return { level: 1, text: 'Weak', color: 'bg-red-500' };
    if (metCount === 2) return { level: 2, text: 'Fair', color: 'bg-yellow-500' };
    if (metCount === 3) return { level: 3, text: 'Good', color: 'bg-blue-500' };
    return { level: 4, text: 'Strong', color: 'bg-green-500' };
  };

  const strength = getStrength();

  const onSubmit = handleSubmit(async (values) => {
    // TODO: Implement password reset completion
    console.log('New password:', values.password);
    router.push('/(auth)/password-success');
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-56 relative"
      >
        <View className="absolute -top-12 right-0 w-25 h-25 bg-white/10 rounded-full translate-x-12" />
        <View className="absolute bottom-0 -left-7 w-15 h-15 bg-white/8 rounded-full" />
        
        <View className="flex-1 justify-center items-center px-6 z-10">
          <Image 
            source={require('../../assets/icon.png')} 
            className="w-16 h-16 mb-4"
          />
          <Text className="text-white text-2xl font-bold mb-2">Create New Password</Text>
          <Text className="text-white/80 text-base text-center">
            Choose a strong password
          </Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <View className="flex-1 -mt-6">
        <View className="bg-white rounded-t-3xl px-6 pt-8 flex-1">
          {/* Requirements Box */}
          <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <Text className="text-gray-800 font-semibold text-sm mb-3">Password Requirements</Text>
            {requirements.map((req, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <View className={`w-4 h-4 rounded-full border-2 mr-3 ${req.met ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {req.met && <Ionicons name="checkmark" size={10} color="white" />}
                </View>
                <Text className={`text-sm ${req.met ? 'text-gray-800' : 'text-gray-500'}`}>
                  {req.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <FloatingTextField
              control={control}
              name="password"
              label="New Password"
              placeholder=""
              secureTextEntry={!showPassword}
              error={errors.password?.message}
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6b7280" />
                </TouchableOpacity>
              }
            />
            
            {/* Strength Indicator */}
            {password && (
              <View className="mt-2">
                <View className="flex-row space-x-2 mb-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <View 
                      key={bar}
                      className={`flex-1 h-1 rounded ${bar <= strength.level ? strength.color : 'bg-gray-200'}`}
                    />
                  ))}
                </View>
                {strength.text && (
                  <Text className="text-xs text-gray-600">{strength.text}</Text>
                )}
              </View>
            )}
          </View>

          {/* Confirm Password Input */}
          <FloatingTextField
            control={control}
            name="confirmPassword"
            label="Confirm New Password"
            placeholder=""
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword?.message}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6b7280" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6b7280" />
              </TouchableOpacity>
            }
          />

          <Button 
            label="Reset Password"
            onPress={onSubmit}
            disabled={!isValid}
            className={`py-3 rounded-2xl mb-6 ${isValid ? 'bg-indigo-600' : 'bg-gray-300'}`}
          />

          {/* Footer */}
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            className="mt-auto mb-4"
          >
            <Text className="text-gray-600 font-medium text-sm text-center">
              ← Back to sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}