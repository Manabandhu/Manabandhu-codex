import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export function Badge({ label, variant = 'info' }: BadgeProps) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-primary-100 text-primary-800'
  };
  
  return (
    <View className={`px-2 py-1 rounded-lg ${colors[variant]}`}>
      <Text className="text-xs font-semibold">{label}</Text>
    </View>
  );
}
