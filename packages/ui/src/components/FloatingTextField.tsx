import { Controller, Control } from 'react-hook-form';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

type Props = TextInputProps & {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function FloatingTextField({ label, name, control, error, leftIcon, rightIcon, className, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            {leftIcon && (
              <View className="absolute left-4 top-4 z-10">
                {leftIcon}
              </View>
            )}
            <TextInput
              className={clsx(
                'border border-gray-300 rounded-2xl px-4 py-4',
                leftIcon ? 'pl-12' : 'pl-4',
                rightIcon ? 'pr-12' : 'pr-4',
                error ? 'border-red-500' : 'border-gray-300',
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onChangeText={onChange}
              value={value as string}
              {...rest}
            />
            <View className={clsx(
              'absolute bg-gray-50 px-2',
              leftIcon ? 'left-6' : 'left-4',
              '-top-3'
            )}>
              <Text className="text-gray-600 text-lg font-medium">
                {label}
              </Text>
            </View>
            {rightIcon && (
              <View className="absolute right-4 top-4 z-10">
                {rightIcon}
              </View>
            )}
          </View>
        )}
      />
      {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
    </View>
  );
}