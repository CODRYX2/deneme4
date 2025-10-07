import GarageView from '../GarageView';

export default function GarageViewExample() {
  const handleAddVehicle = () => {
    console.log('Add vehicle clicked');
  };

  const handleViewGarage = () => {
    console.log('View garage clicked');
  };

  return (
    <div className="bg-background p-6">
      <h2 className="text-xl font-bold text-primary mb-4">MY GARAGE</h2>
      <GarageView
        onAddVehicle={handleAddVehicle}
        onViewGarage={handleViewGarage}
      />
    </div>
  );
}
