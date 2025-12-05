import { Controller, Control } from 'react-hook-form';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import clsx from 'clsx';

type Props = TextInputProps & {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
};

export function TextField({ label, name, control, error, className, ...rest }: Props) {
  return (
    <View className="gap-1">
      <Text className="text-gray-700">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={clsx(
              'border border-gray-200 rounded-lg px-3 py-3',
              error ? 'border-red-500' : 'border-gray-200',
              className
            )}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as string}
            {...rest}
          />
        )}
      />
      {error && <Text className="text-red-600 text-sm">{error}</Text>}
    </View>
  );
}
