import { Controller, Control } from 'react-hook-form';
import { TextInput, Text, View, TextInputProps, Animated } from 'react-native';
import { useState, useRef, useEffect, ReactNode } from 'react';
import clsx from 'clsx';

type Props = TextInputProps & {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function TextField({ label, name, control, error, className, leftIcon, rightIcon, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(0)).current;

  return (
    <View className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          const hasValue = value && value.length > 0;
          
          useEffect(() => {
            Animated.timing(labelAnim, {
              toValue: isFocused || hasValue ? 1 : 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }, [isFocused, hasValue]);

          const labelStyle = {
            position: 'absolute' as const,
            left: leftIcon ? 60 : 16,
            top: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, -10],
            }),
            fontSize: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 4,
            zIndex: 1,
          };

          return (
            <View>
              <View className={clsx(
                'relative border rounded-2xl flex-row items-center',
                error ? 'border-red-500' : isFocused ? 'border-indigo-600' : 'border-gray-300',
              )}>
                {leftIcon && (
                  <View className="pl-4">{leftIcon}</View>
                )}
                <View className="flex-1">
                  <Animated.Text style={labelStyle} className="text-gray-500">
                    {label}
                  </Animated.Text>
                  <TextInput
                    className={clsx(
                      'py-4 px-4 text-base',
                      leftIcon && 'pl-2',
                      rightIcon && 'pr-2',
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
                </View>
                {rightIcon && (
                  <View className="pr-4">{rightIcon}</View>
                )}
              </View>
              {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
            </View>
          );
        }}
      />
    </View>
  );
}
