import { ScrollView, Text, View } from 'react-native';
import { Card, Button, TextField } from '@/components/ui';
import { useFinanceStore } from '@/utils/state/finance';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z.string().min(2),
  amount: z.coerce.number().positive(),
  currency: z.string().default('USD'),
  category: z.string().default('General')
});

type FormValues = z.infer<typeof schema>;

export default function FinanceScreen() {
  const addExpense = useFinanceStore((s) => s.addExpense);
  const expenses = useFinanceStore((s) => s.expenses);
  const { control, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = handleSubmit((values) => {
    addExpense({
      id: Date.now().toString(),
      description: values.description,
      amount: values.amount,
      currency: values.currency,
      category: values.category,
      createdAt: new Date().toISOString()
    });
  });

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Add Expense</Text>
        <TextField control={control} name="description" label="Description" placeholder="Groceries" error={formState.errors.description?.message} />
        <TextField
          control={control}
          name="amount"
          label="Amount"
          keyboardType="numeric"
          placeholder="50"
          error={formState.errors.amount?.message}
        />
        <TextField control={control} name="currency" label="Currency" placeholder="USD" />
        <TextField control={control} name="category" label="Category" placeholder="Food" />
        <Button label="Add" onPress={submit} />
      </Card>

      <Card className="gap-3">
        <Text className="text-xl font-semibold">Recent Expenses</Text>
        {expenses.length === 0 && <Text className="text-gray-500">Track your spending across currencies.</Text>}
        {expenses.map((e) => (
          <View key={e.id} className="flex-row justify-between">
            <View>
              <Text className="font-medium">{e.description}</Text>
              <Text className="text-gray-500">{e.category}</Text>
            </View>
            <Text className="text-primary">{e.amount} {e.currency}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}
