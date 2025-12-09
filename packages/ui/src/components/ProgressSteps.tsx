import { View, Text } from 'react-native';
import clsx from 'clsx';

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressSteps({ currentStep, totalSteps }: Props) {
  return (
    <View className="items-center py-4">
      <View className="flex-row gap-8 mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            className={clsx(
              'h-2 rounded-full',
              i + 1 === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/30'
            )}
          />
        ))}
      </View>
      <Text className="text-white/80 text-sm">
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
}
