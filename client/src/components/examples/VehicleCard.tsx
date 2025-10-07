import VehicleCard from '../VehicleCard';

export default function VehicleCardExample() {
  return (
    <div className="bg-background p-6 space-y-6">
      <VehicleCard
        rank={1}
        brand="HYUNDAI"
        model="I20 N"
        year={2024}
        plateNumber="A4 ALI4NUN"
        country="TR"
        owner="ALI4NUN"
        likes={337}
      />
      
      <VehicleCard
        rank={2}
        brand="MERCEDES-BENZ"
        model="C-Class"
        year={2017}
        plateNumber="KA KAVAA"
        country="DE"
        owner="COUPEPHANTOM"
        likes={220}
      />

      <VehicleCard
        rank={3}
        brand="BMW"
        model="420"
        year={2021}
        plateNumber="CO COUPEPHANTOM"
        country="US"
        owner="COUPEPHANTOM"
        likes={194}
      />
    </div>
  );
}
