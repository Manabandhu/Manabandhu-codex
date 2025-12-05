import { ReactNode } from 'react';
import { Modal, View, Text } from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export function ModalSheet({ visible, title, onClose, children }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-4 gap-3">
          {title && <Text className="text-lg font-semibold">{title}</Text>}
          {children}
        </View>
      </View>
    </Modal>
  );
}
