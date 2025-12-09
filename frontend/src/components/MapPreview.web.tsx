import { View } from 'react-native';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  region?: Region;
}

export function MapPreview({ region }: Props) {
  return <View className="h-40 bg-gray-100 rounded-xl" />;
}
