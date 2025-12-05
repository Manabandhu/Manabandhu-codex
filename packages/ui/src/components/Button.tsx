import { Pressable, Text, PressableProps } from 'react-native';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
}

const base = 'rounded-lg px-4 py-3 items-center justify-center';
const variants: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-gray-100 border border-primary',
  ghost: 'bg-transparent'
};

export function Button({ label, variant = 'primary', className, ...rest }: ButtonProps) {
  return (
    <Pressable
      className={clsx(base, variants[variant], className)}
      accessibilityLabel={label}
      {...rest}
    >
      <Text className={clsx('font-semibold', variant === 'primary' ? 'text-white' : 'text-primary')}>
        {label}
      </Text>
    </Pressable>
  );
}
