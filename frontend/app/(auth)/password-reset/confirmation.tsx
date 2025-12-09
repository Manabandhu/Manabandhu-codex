import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@manabandhu/ui/components';

export default function ResetConfirmationScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Mock email - in real app this would come from route params or state
  const email = "john@example.com";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (canResend) {
      setCountdown(60);
      setCanResend(false);
      // TODO: Implement resend logic
    }
  };

  const openEmailApp = () => {
    Linking.openURL('mailto:');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-55 relative"
      >
        <View className="absolute -top-12 right-0 w-25 h-25 bg-white/10 rounded-full translate-x-12" />
        <View className="absolute bottom-0 -left-7 w-15 h-15 bg-white/8 rounded-full" />
        
        <View className="flex-1 justify-center items-center px-6 z-10">
          <Image 
            source={require('../../assets/icon.png')} 
            className="w-16 h-16 mb-4"
          />
          <Text className="text-white text-2xl font-bold">Check Your Email</Text>
        </View>
      </LinearGradient>

      {/* Content Section */}
      <View className="flex-1 px-6 -mt-6">
        <View className="bg-white rounded-3xl p-6 flex-1">
          {/* Mail Icon */}
          <View className="w-16 h-16 bg-indigo-100 rounded-full items-center justify-center mx-auto mb-6">
            <Ionicons name="mail-outline" size={32} color="#4f46e5" />
          </View>

          {/* Message */}
          <Text className="text-gray-600 text-base font-medium text-center mb-1">
            We sent a password reset link to
          </Text>
          <Text className="text-indigo-600 text-base font-semibold text-center mb-4">
            {email}
          </Text>
          <Text className="text-gray-500 text-sm text-center mb-8">
            The link will expire in 15 minutes
          </Text>

          {/* Buttons */}
          <Button 
            label="Open Email App"
            onPress={openEmailApp}
            className="bg-indigo-600 py-3 rounded-2xl mb-4"
          />

          <TouchableOpacity 
            onPress={handleResend}
            disabled={!canResend}
            className={`py-3 px-6 border-2 border-gray-200 rounded-2xl mb-4 ${!canResend ? 'opacity-50' : ''}`}
          >
            <Text className="text-gray-600 font-semibold text-center">Resend Email</Text>
          </TouchableOpacity>

          {!canResend && (
            <Text className="text-gray-500 text-xs text-center mb-6">
              You can resend in {formatTime(countdown)}
            </Text>
          )}

          {/* Footer */}
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/reset-password')}
            className="mt-auto mb-4"
          >
            <Text className="text-indigo-600 font-semibold text-sm text-center">
              Wrong email? Try again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}