import React, { forwardRef } from 'react';
import { Pressable, PressableProps, Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type Variant = 'primary' | 'secondary';

interface ButtonProps extends PressableProps {
  label?: string;
  variant?: Variant;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

interface BaseTextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

interface ControlledTextFieldProps<TFieldValues extends FieldValues> extends BaseTextFieldProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

type TextFieldProps<TFieldValues extends FieldValues = any> =
  | (BaseTextFieldProps & { control?: never; name?: never })
  | ControlledTextFieldProps<TFieldValues>;

const mergeClassName = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ');

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <View className={mergeClassName('bg-white rounded-2xl p-4 shadow-sm border border-gray-100', className)}>{children}</View>
);

export const Button = forwardRef<Pressable, ButtonProps>(
  ({ label, variant = 'primary', className, textClassName, children, ...pressableProps }, ref) => {
    const baseStyles =
      variant === 'secondary'
        ? 'bg-white border border-blue-600'
        : 'bg-blue-600';
    const textStyles = variant === 'secondary' ? 'text-blue-600' : 'text-white';

    return (
      <Pressable
        ref={ref}
        className={mergeClassName(baseStyles, 'rounded-full py-3 px-4 items-center', className)}
        {...pressableProps}
      >
        <Text className={mergeClassName('font-semibold text-base', textStyles, textClassName)}>
          {children ?? label}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const TextFieldInput = ({
  label,
  error,
  className,
  value,
  onChangeText,
  ...inputProps
}: BaseTextFieldProps) => (
  <View className={mergeClassName('mb-3', className)}>
    {label && <Text className="text-gray-700 mb-1 font-semibold">{label}</Text>}
    <TextInput
      className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-base"
      value={value ?? ''}
      onChangeText={onChangeText}
      {...inputProps}
    />
    {error ? <Text className="text-red-500 text-sm mt-1">{error}</Text> : null}
  </View>
);

export function TextField<TFieldValues extends FieldValues = any>(
  props: TextFieldProps<TFieldValues>
) {
  if ('control' in props && props.control && props.name) {
    const { control, name, ...rest } = props;
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextFieldInput
            {...rest}
            value={(field.value as string) ?? ''}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
    );
  }

  return <TextFieldInput {...props} />;
}
