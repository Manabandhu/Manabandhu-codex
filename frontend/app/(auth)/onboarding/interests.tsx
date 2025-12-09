import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';
import { 
  Briefcase, Home, MapPin, ShoppingCart, DollarSign, 
  Activity, BookOpen, Lock, Calendar, Coffee, FileText, Globe 
} from 'lucide-react-native';
import { InterestCard } from '@manabandhu/ui/components/InterestCard';
import { ProgressSteps } from '@manabandhu/ui/components/ProgressSteps';

const INTERESTS = [
  { id: 'jobs', label: 'Jobs & Career', icon: Briefcase },
  { id: 'housing', label: 'Housing', icon: Home },
  { id: 'immigration', label: 'Immigration', icon: MapPin },
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
  { id: 'finance', label: 'Finance & Banking', icon: DollarSign },
  { id: 'healthcare', label: 'Healthcare', icon: Activity },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'transportation', label: 'Transportation', icon: Lock },
  { id: 'events', label: 'Events & Community', icon: Calendar },
  { id: 'food', label: 'Food & Dining', icon: Coffee },
  { id: 'legal', label: 'Legal Services', icon: FileText },
  { id: 'language', label: 'Language Learning', icon: Globe },
];

export default function InterestsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push('/(auth)/onboarding/customize');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        start={{ x: 0.09, y: 0.21 }}
        end={{ x: 0.91, y: 0.79 }}
        className="pt-6"
      >
        <ProgressSteps currentStep={2} totalSteps={4} />
        
        <View className="items-center py-8">
          <Image 
            source={require('../../../assets/logo.png')} 
            className="w-[60px] h-[60px] mb-4"
          />
          <Text className="text-white text-2xl font-bold mb-2">
            What interests you?
          </Text>
          <Text className="text-white/80 text-base">
            Select all that apply
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="flex-row flex-wrap gap-3">
          {INTERESTS.map(({ id, label, icon: Icon }) => (
            <View key={id} className="w-[48%]">
              <InterestCard
                icon={<Icon size={32} color="#6b7280" />}
                label={label}
                selected={selected.includes(id)}
                onPress={() => toggleInterest(id)}
              />
            </View>
          ))}
        </View>

        <Text className="text-gray-500 text-sm text-center my-6">
          {selected.length} selected
        </Text>

        <View className="pb-8">
          <Pressable
            onPress={handleContinue}
            disabled={selected.length === 0}
            className={`rounded-2xl py-4 ${
              selected.length > 0 ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Continue
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push('/(auth)/onboarding/customize')} className="py-4">
            <Text className="text-gray-500 text-base font-medium text-center">
              Skip for now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
