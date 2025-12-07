import { View, Text, ScrollView } from 'react-native';
import { TextField, Button } from '@manabandhu/ui/components';
import { useState } from 'react';

export default function CreateListingScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-display font-bold text-primary-700 mb-4">Create Listing</Text>
      <TextField label="Title" value={title} onChangeText={setTitle} />
      <TextField label="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextField label="Description" multiline numberOfLines={4} />
      <Button label="Upload Photos" variant="secondary" className="my-3" />
      <Button label="Publish" variant="primary" />
    </ScrollView>
  );
}
