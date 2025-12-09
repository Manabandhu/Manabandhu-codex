import { View, Text, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Polyline } from 'react-native-svg';

interface TipItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SuccessScreenProps {
  onExplore: () => void;
  onTour: () => void;
}

const CheckIcon = () => (
  <Svg width={80} height={80} viewBox="0 0 80 80">
    <Circle cx={40} cy={40} r={38} fill="white" />
    <Polyline
      points="22 40 34 52 58 28"
      fill="none"
      stroke="#4F46E5"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Circle cx={11} cy={11} r={8} fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
    <Polyline points="21 21 16.65 16.65" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const UsersIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Polyline points="16 21 16 19 12 15 6 15 2 19 2 21" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
    <Circle cx={9} cy={7} r={4} fill="none" stroke="white" strokeWidth={2} />
    <Polyline points="22 21 22 19 19 15.13" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
    <Polyline points="16 3.13 16 10.88" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const BellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Polyline points="18 8 18 8 12 2 6 8 6 8 3 17 21 17 18 8" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
    <Polyline points="13.73 21 10.27 21" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export function SuccessScreen({ onExplore, onTour }: SuccessScreenProps) {
  const iconAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const tipsAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(iconAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(contentAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(tipsAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(ctaAnim, { toValue: 1, duration: 400, useNativeDriver: true })
    ]).start();
  }, []);

  const tips: TipItem[] = [
    { icon: <SearchIcon />, title: 'Explore the marketplace', description: 'Browse jobs, housing, services, and more tailored to your community' },
    { icon: <UsersIcon />, title: 'Connect with your community', description: 'Find and connect with people from your country and culture' },
    { icon: <BellIcon />, title: 'Stay updated with notifications', description: 'Get real-time alerts for new opportunities and community updates' }
  ];

  return (
    <LinearGradient colors={['#6366F1', '#4F46E5', '#4338CA']} className="flex-1" start={{ x: 0.09, y: 0.21 }} end={{ x: 0.91, y: 0.79 }}>
      <View className="flex-1 px-6 pt-20">
        <Animated.View style={{ opacity: iconAnim, transform: [{ scale: iconAnim }] }} className="items-center mb-8">
          <CheckIcon />
        </Animated.View>

        <Animated.View style={{ opacity: contentAnim, transform: [{ translateY: contentAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }} className="items-center mb-12">
          <Text className="text-white text-3xl font-bold mb-3">You're All Set!</Text>
          <Text className="text-white/90 text-lg text-center">Welcome to the ManaBandhu{'\n'}community</Text>
        </Animated.View>

        <Animated.View style={{ opacity: tipsAnim, transform: [{ translateY: tipsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }} className="bg-white rounded-3xl p-6 mb-8">
          <Text className="text-gray-900 text-lg font-semibold mb-6">Quick Tips to Get Started</Text>
          {tips.map((tip, i) => (
            <View key={i} className="flex-row mb-6 last:mb-0">
              <LinearGradient colors={['#6366F1', '#4F46E5']} className="w-10 h-10 rounded-xl items-center justify-center mr-3">
                {tip.icon}
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-gray-900 text-base font-semibold mb-1">{tip.title}</Text>
                <Text className="text-gray-500 text-sm leading-5">{tip.description}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={{ opacity: ctaAnim, transform: [{ translateY: ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
          <Pressable onPress={onExplore} className="bg-white rounded-2xl py-4 mb-4 active:opacity-80">
            <Text className="text-indigo-600 text-lg font-semibold text-center">Explore ManaBandhu</Text>
          </Pressable>
          <Pressable onPress={onTour} className="border-2 border-white rounded-2xl py-4 active:opacity-80">
            <Text className="text-white text-lg font-semibold text-center">Take a Quick Tour</Text>
          </Pressable>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
