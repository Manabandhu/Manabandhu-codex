import MapView, { Marker } from 'react-native-maps';
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
  if (!region) return <View className="h-40 bg-gray-100 rounded-xl" />;
  return (
    <MapView
      style={{ height: 180, width: '100%', borderRadius: 12 }}
      initialRegion={region}
      pointerEvents="none"
    >
      <Marker coordinate={region} />
    </MapView>
  );
}
