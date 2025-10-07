import { Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import LicensePlate3D from "./LicensePlate3D";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  country: "TR" | "DE" | "US";
  imageUrl?: string;
}

interface GarageViewProps {
  vehicles?: Vehicle[];
  onAddVehicle?: () => void;
  onViewGarage?: () => void;
}

export default function GarageView({ vehicles = [], onAddVehicle, onViewGarage }: GarageViewProps) {
  //todo: remove mock functionality
  const mockVehicles: Vehicle[] = vehicles.length > 0 ? vehicles : [
    {
      id: "1",
      brand: "BMW",
      model: "728",
      year: 1997,
      plateNumber: "BMW 728",
      country: "TR"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-muted-foreground">GARAGE</h3>
        <button 
          onClick={onViewGarage}
          className="flex items-center gap-2 text-primary hover-elevate px-3 py-1 rounded-lg"
          data-testid="button-view-garage"
        >
          <span className="text-sm font-bold">VIEW GARAGE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {mockVehicles.map((vehicle) => (
        <GlassCard key={vehicle.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer">
          <div className="aspect-video bg-gradient-to-br from-card/50 to-card/10 relative flex items-center justify-center">
            {vehicle.imageUrl ? (
              <img src={vehicle.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">🚗</span>
            )}
            <div className="absolute bottom-2 right-2">
              <ChevronRight className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold text-foreground" data-testid="text-vehicle-name">
                {vehicle.brand} <span className="text-muted-foreground">{vehicle.model}</span>
              </h3>
              <p className="text-sm text-muted-foreground">{vehicle.year}</p>
            </div>
            <LicensePlate3D
              plateNumber={vehicle.plateNumber}
              country={vehicle.country}
            />
          </div>
        </GlassCard>
      ))}

      <Button
        variant="outline"
        className="w-full border-primary/50 hover:bg-primary/10"
        onClick={onAddVehicle}
        data-testid="button-add-vehicle"
      >
        <Plus className="w-4 h-4 mr-2" />
        ADD VEHICLE +
      </Button>

      <p className="text-center text-sm text-muted-foreground px-4">
        Maşınlarınız üçün də Snap çıxdı😊
      </p>
    </div>
  );
}
