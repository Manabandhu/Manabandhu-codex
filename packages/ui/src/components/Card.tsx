import { View, ViewProps } from 'react-native';
import clsx from 'clsx';

export function Card({ className, ...props }: ViewProps) {
  return <View className={clsx('bg-white shadow-sm rounded-xl p-4', className)} {...props} />;
}
