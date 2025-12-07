import { Pressable, Text, PressableProps } from 'react-native';

interface IconButtonProps extends PressableProps {
  icon: string;
  label?: string;
}

export function IconButton({ icon, label, className, ...rest }: IconButtonProps) {
  return (
    <Pressable className={`items-center justify-center p-3 ${className}`} {...rest}>
      <Text className="text-2xl">{icon}</Text>
      {label && <Text className="text-xs mt-1">{label}</Text>}
    </Pressable>
  );
}
