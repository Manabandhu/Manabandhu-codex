import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@manabandhu/ui/components';

export default function PasswordSuccessScreen() {
  const router = useRouter();
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnimations = useRef(
    Array.from({ length: 9 }, () => ({
      translateY: new Animated.Value(-100),
      opacity: new Animated.Value(0),
      rotate: new Animated.Value(0)
    }))
  ).current;

  useEffect(() => {
    // Animate checkmark
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }, 500);

    // Animate confetti
    setTimeout(() => {
      const confettiAnimationPromises = confettiAnimations.map((anim, index) => {
        return new Promise(resolve => {
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 200,
              delay: index * 50,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 800,
              duration: 2000,
              delay: index * 50,
              useNativeDriver: true,
            }),
            Animated.timing(anim.rotate, {
              toValue: 360,
              duration: 2000,
              delay: index * 50,
              useNativeDriver: true,
            })
          ]).start(resolve);
        });
      });

      Promise.all(confettiAnimationPromises).then(() => {
        // Fade out confetti
        confettiAnimations.forEach(anim => {
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      });
    }, 800);
  }, []);

  const confettiColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Confetti */}
      {confettiAnimations.map((anim, index) => (
        <Animated.View
          key={index}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: confettiColors[index],
            left: 39 + (index * 39),
            transform: [
              { translateY: anim.translateY },
              { rotate: anim.rotate.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg']
              }) }
            ],
            opacity: anim.opacity,
          }}
        />
      ))}

      {/* Hero Section */}
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        className="h-55 relative"
      >
        <View className="absolute -top-12 right-0 w-25 h-25 bg-white/10 rounded-full translate-x-12" />
        <View className="absolute bottom-0 -left-7 w-15 h-15 bg-white/8 rounded-full" />
        
        <View className="flex-1 justify-center items-center px-6 z-10">
          <Image 
            source={require('../../../assets/icon.png')} 
            className="w-15 h-15 mb-4"
          />
          <Text className="text-white text-2xl font-bold">Password Reset!</Text>
        </View>
      </LinearGradient>

      {/* Success Section */}
      <View className="flex-1 px-6 -mt-6">
        <View className="bg-white rounded-3xl p-6 flex-1 items-center justify-center">
          {/* Success Icon */}
          <Animated.View 
            className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-6"
            style={{
              transform: [{ scale: checkmarkScale }],
              opacity: checkmarkOpacity,
            }}
          >
            <Ionicons name="checkmark" size={32} color="#059669" />
          </Animated.View>

          {/* Success Message */}
          <Text className="text-gray-600 text-base font-medium text-center mb-2">
            Your password has been successfully {'\n'}reset
          </Text>
          <Text className="text-gray-500 text-sm text-center mb-8">
            You can now sign in with your new {'\n'}password
          </Text>

          {/* Sign In Button */}
          <Button 
            label="Sign In"
            onPress={() => router.push('/(auth)/onboarding')}
            className="bg-indigo-600 py-3 rounded-2xl w-full"
          />
        </View>
      </View>
    </View>
  );
}