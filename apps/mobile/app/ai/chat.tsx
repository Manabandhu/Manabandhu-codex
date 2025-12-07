import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button } from '@manabandhu/ui/components';
import { useAIStore } from '@manabandhu/utils/state/ai';
import { useState } from 'react';

export default function AIChatScreen() {
  const [input, setInput] = useState('');
  const chatHistory = useAIStore((s) => s.chatHistory);
  
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {chatHistory.map((msg) => (
          <View key={msg.id} className={`mb-3 p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary-100 self-end' : 'bg-gray-100'}`}>
            <Text>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View className="p-4 border-t border-gray-200 flex-row gap-2">
        <TextInput className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Ask me anything..." value={input} onChangeText={setInput} />
        <Button label="Send" variant="primary" />
      </View>
    </View>
  );
}
