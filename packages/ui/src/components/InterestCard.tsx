import { View, Text, Pressable } from 'react-native';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react-native';

type Props = {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function InterestCard({ icon, label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        'h-[120px] rounded-2xl border-2 bg-white items-center justify-center relative',
        selected ? 'border-indigo-600' : 'border-gray-200'
      )}
    >
      <View className="items-center">
        <View className="mb-3">{icon}</View>
        <Text className="text-gray-700 font-medium text-sm">{label}</Text>
      </View>
      {selected && (
        <View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-indigo-600 items-center justify-center">
          <Check size={16} color="white" strokeWidth={3} />
        </View>
      )}
    </Pressable>
  );
}
