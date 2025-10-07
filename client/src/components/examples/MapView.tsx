import MapView from '../MapView';

export default function MapViewExample() {
  return (
    <MapView
      userLocation="İzmir"
      speed={1}
      nearbySticker={{
        name: "Zero Limits",
        distance: "240M"
      }}
    />
  );
}
