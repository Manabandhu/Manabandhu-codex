import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, View, Text } from 'react-native';
import { Button, TextField, Card } from '@/components/ui';
import { useRoomsStore } from '@/utils/state/rooms';
import { MapPreview } from '../../src/components/MapPreview';
import { useState } from 'react';
import { Region } from 'react-native-maps';

const schema = z.object({
  title: z.string().min(3),
  location: z.string(),
  price: z.coerce.number().positive(),
  amenities: z.string(),
  description: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function RoomListingScreen() {
  const add = useRoomsStore((s) => s.addRoom);
  const [region, setRegion] = useState<Region | undefined>();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = handleSubmit((values) => {
    add({
      id: Date.now().toString(),
      title: values.title,
      price: values.price,
      location: values.location,
      amenities: values.amenities.split(',').map((v) => v.trim()),
      description: values.description,
      coordinates: region
    });
  });

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <Card className="gap-3">
        <Text className="text-xl font-semibold">Create Room Listing</Text>
        <TextField
          control={control}
          name="title"
          label="Title"
          placeholder="Cozy room in downtown"
          error={errors.title?.message}
        />
        <TextField
          control={control}
          name="location"
          label="Location"
          placeholder="City, Country"
          error={errors.location?.message}
          onBlur={(e) => {
            // In production, geocode and set region based on location text.
            const text = e.nativeEvent.text;
            if (text) {
              setRegion({
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
              });
            }
          }}
        />
        <TextField
          control={control}
          name="price"
          label="Monthly Budget"
          keyboardType="numeric"
          placeholder="800"
          error={errors.price?.message}
        />
        <TextField
          control={control}
          name="amenities"
          label="Amenities"
          placeholder="wifi, laundry, parking"
          error={errors.amenities?.message}
        />
        <TextField
          control={control}
          name="description"
          label="Description"
          placeholder="Share details, house rules, roommate preferences"
          multiline
        />
        <MapPreview region={region} />
        <Button label="Save listing" onPress={submit} />
      </Card>
    </ScrollView>
  );
}
