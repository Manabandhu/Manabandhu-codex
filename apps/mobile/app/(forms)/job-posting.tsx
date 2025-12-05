import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, Text } from 'react-native';
import { Button, TextField, Card } from '@manabandhu/ui/components';
import { useJobsStore } from '@manabandhu/utils/state/jobs';

const schema = z.object({
  title: z.string().min(3),
  company: z.string().min(2),
  location: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export default function JobPostingScreen() {
  const add = useJobsStore((s) => s.addJob);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = handleSubmit((values) => {
    add({
      id: Date.now().toString(),
      ...values,
      verified: false
    });
  });

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Post a Job</Text>
        <TextField
          control={control}
          name="title"
          label="Role"
          placeholder="Backend Engineer"
          error={errors.title?.message}
        />
        <TextField
          control={control}
          name="company"
          label="Company"
          placeholder="Acme Corp"
          error={errors.company?.message}
        />
        <TextField
          control={control}
          name="location"
          label="Location"
          placeholder="Remote / City"
          error={errors.location?.message}
        />
        <TextField
          control={control}
          name="category"
          label="Category"
          placeholder="Engineering, Finance"
          error={errors.category?.message}
        />
        <TextField
          control={control}
          name="description"
          label="Description"
          placeholder="Responsibilities, requirements, benefits"
          multiline
          error={errors.description?.message}
        />
        <Button label="Publish job" onPress={submit} />
      </Card>
    </ScrollView>
  );
}
