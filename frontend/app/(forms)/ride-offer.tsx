import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, Text } from 'react-native';
import { Button, TextField, Card } from '@/components/ui';
import { useRidesStore } from '@/utils/state/rides';

const schema = z.object({
  route: z.string().min(3),
  time: z.string().min(3),
  seats: z.coerce.number().min(1),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function RideOfferScreen() {
  const add = useRidesStore((s) => s.addRide);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = handleSubmit((values) => {
    add({ id: Date.now().toString(), ...values });
  });

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Offer a Ride</Text>
        <TextField
          control={control}
          name="route"
          label="Route"
          placeholder="City A to City B"
          error={errors.route?.message}
        />
        <TextField
          control={control}
          name="time"
          label="Departure time"
          placeholder="Tomorrow 9:00 AM"
          error={errors.time?.message}
        />
        <TextField
          control={control}
          name="seats"
          label="Seats"
          keyboardType="numeric"
          placeholder="3"
          error={errors.seats?.message}
        />
        <TextField
          control={control}
          name="notes"
          label="Notes"
          placeholder="Pickup spot, luggage space, payment"
          multiline
        />
        <Button label="Share ride" onPress={submit} />
      </Card>
    </ScrollView>
  );
}
