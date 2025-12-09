import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, FloatingTextField } from '@manabandhu/ui/components';
import { usePasswordReset } from '../../../src/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Please enter a valid email address')
});

export default function ResetPasswordScreen() {
  const router = useRouter();
  const passwordReset = usePasswordReset();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await passwordReset.mutateAsync({ email: values.email });
      router.push('/(auth)/password-reset/confirmation');
    } catch (error: any) {
      console.error('Password reset error:', error);
      const message = error?.response?.status === 404
        ? 'No account found with this email'
        : 'Failed to send reset link. Please try again.';
      Alert.alert('Error', message);
    }
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#0EA5E9', '#0369A1']}
        className="h-60 relative"
      >
        <View className="absolute -top-12 right-0 w-25 h-25 bg-white/10 rounded-full translate-x-12" />
        <View className="absolute bottom-0 -left-7 w-15 h-15 bg-white/8 rounded-full" />
        
        <View className="flex-1 justify-center items-center px-6 z-10">
          <Image 
            source={require('../../../assets/icon.png')} 
            className="w-16 h-16 mb-4"
          />
          <Text className="text-white text-2xl font-bold mb-2">Reset Password</Text>
          <Text className="text-white/80 text-base text-center">
            We'll help you get back in
          </Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <View className="flex-1 -mt-6">
        <View className="bg-white rounded-t-3xl px-6 pt-8 flex-1">
          <Text className="text-gray-600 text-base mb-6 leading-6">
            Enter your email address and we'll send you {'\n'}instructions to reset your password
          </Text>

          <FloatingTextField
            control={control}
            name="email"
            label="Email"
            placeholder=""
            error={errors.email?.message}
            leftIcon={<Ionicons name="mail-outline" size={20} color="#6b7280" />}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button 
            label={passwordReset.isPending ? 'Sending...' : 'Send Reset Link'}
            onPress={onSubmit}
            disabled={passwordReset.isPending}
            className="bg-indigo-600 py-3 rounded-2xl mb-8"
          />

          {/* Alternative Methods */}
          <View className="items-center mb-6">
            <Text className="text-gray-600 text-sm mb-4">Or reset via</Text>
            
            <View className="flex-row space-x-2">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white mr-1">
                <Ionicons name="phone-portrait-outline" size={16} color="#374151" />
                <Text className="ml-2 text-gray-900 font-medium text-sm">Phone Number</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white ml-1">
                <Ionicons name="help-circle-outline" size={16} color="#374151" />
                <Text className="ml-2 text-gray-900 font-medium text-sm">Security Questions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center items-center mt-auto mb-8">
            <Text className="text-gray-600 text-sm">Remember your password? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-indigo-600 font-semibold text-sm">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}