import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';
import { Briefcase, Home, Car, CreditCard, Eye, GripVertical } from 'lucide-react-native';

const MODULES = [
  { id: 'jobs', title: 'Jobs & Career', subtitle: 'Latest opportunities', icon: Briefcase, gradient: ['#F59E0B', '#D97706'] },
  { id: 'housing', title: 'Housing', subtitle: 'Apartments & rooms', icon: Home, gradient: ['#3B82F6', '#2563EB'] },
  { id: 'rides', title: 'Rides & Transportation', subtitle: 'Carpools & transit', icon: Car, gradient: ['#10B981', '#059669'] },
  { id: 'finance', title: 'Finance & Banking', subtitle: 'Money management', icon: CreditCard, gradient: ['#8B5CF6', '#7C3AED'] },
];

export default function CustomizeScreen() {
  const [priorities, setPriorities] = useState({
    jobs: true,
    housing: true,
    rides: false,
    finance: false,
  });

  const togglePriority = (id: string) => {
    setPriorities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const priorityModules = MODULES.filter(m => priorities[m.id]);

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#6366f1', '#4f46e5', '#4338ca']}
        start={{ x: 0.09, y: 0.21 }}
        end={{ x: 0.91, y: 0.79 }}
        className="relative"
      >
        <View className="absolute -top-12 right-0 w-[100px] h-[100px] bg-white/10 rounded-full translate-x-12" />
        <View className="absolute bottom-0 -left-7 w-[60px] h-[60px] bg-white/8 rounded-full" />
        
        <View className="px-6 pt-6 pb-8 z-10">
          <View className="mb-4">
            <Text className="text-white/90 text-sm font-medium">Step 4 of 4</Text>
            <View className="mt-2 h-1.5 bg-white/20 rounded-full">
              <View className="h-full w-[76%] bg-white rounded-full" />
            </View>
          </View>
          
          <Text className="text-white text-3xl font-bold leading-tight">
            Customize Your{'\n'}Homepage
          </Text>
          <Text className="text-white/80 text-base mt-2">
            Choose what you want to see first
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 -mt-6">
        <View className="bg-white rounded-t-3xl pt-8 pb-6">
          <Text className="text-gray-900 text-2xl font-semibold mb-2">
            Set Your Priorities
          </Text>
          <Text className="text-gray-500 text-base mb-6">
            Drag to reorder or toggle to set as priority
          </Text>

          <View className="space-y-4">
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <View
                  key={module.id}
                  className="flex-row items-center bg-white border border-gray-200 rounded-2xl p-4"
                >
                  <GripVertical size={20} color="#D1D5DB" />
                  
                  <LinearGradient
                    colors={module.gradient}
                    start={{ x: 0.15, y: 0.15 }}
                    end={{ x: 0.85, y: 0.85 }}
                    className="w-12 h-12 rounded-xl items-center justify-center ml-3"
                  >
                    <Icon size={24} color="#fff" />
                  </LinearGradient>

                  <View className="flex-1 ml-4">
                    <Text className="text-gray-900 text-base font-semibold">
                      {module.title}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {module.subtitle}
                    </Text>
                  </View>

                  <Switch
                    value={priorities[module.id]}
                    onValueChange={() => togglePriority(module.id)}
                    trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                    thumbColor="#fff"
                  />
                </View>
              );
            })}
          </View>

          <View className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <View className="flex-row items-center mb-4">
              <Eye size={16} color="#6B7280" />
              <Text className="text-gray-600 text-sm font-semibold ml-2">
                Your homepage will show this content first
              </Text>
            </View>

            <View className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 space-y-3">
              {priorityModules.map((module, idx) => {
                const Icon = module.icon;
                return (
                  <View key={module.id} className="flex-row items-center">
                    <LinearGradient
                      colors={module.gradient}
                      start={{ x: 0.15, y: 0.15 }}
                      end={{ x: 0.85, y: 0.85 }}
                      className="w-8 h-8 rounded-lg items-center justify-center"
                    >
                      <Icon size={16} color="#fff" />
                    </LinearGradient>

                    <View className="flex-1 ml-3">
                      <Text className="text-gray-700 text-sm font-semibold">
                        {module.title}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {idx === 0 ? 'Top section' : idx === 1 ? 'Second section' : 'Below fold'}
                      </Text>
                    </View>

                    <View className="bg-indigo-50 px-3 py-1 rounded-full">
                      <Text className="text-indigo-600 text-xs font-semibold">
                        Priority
                      </Text>
                    </View>
                  </View>
                );
              })}

              {priorityModules.length === 0 && (
                <Text className="text-gray-400 text-sm text-center py-4">
                  Select at least one priority module
                </Text>
              )}
            </View>
          </View>

          <Pressable
            onPress={() => router.replace('/(main)/')}
            className="bg-indigo-600 rounded-2xl py-4 mt-8"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Complete Setup
            </Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/(main)/')} className="py-4 mt-2">
            <Text className="text-gray-500 text-sm text-center">
              I'll customize later
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
