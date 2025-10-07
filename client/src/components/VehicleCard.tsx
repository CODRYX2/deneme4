import { Heart, MessageCircle } from "lucide-react";
import GlassCard from "./GlassCard";
import LicensePlate3D from "./LicensePlate3D";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  rank?: number;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  country: "TR" | "DE" | "US";
  imageUrl?: string;
  owner: string;
  likes: number;
  className?: string;
}

export default function VehicleCard({
  rank,
  brand,
  model,
  year,
  plateNumber,
  country,
  imageUrl,
  owner,
  likes,
  className
}: VehicleCardProps) {
  const isTopRank = rank && rank <= 3;
  const rankColors = {
    1: "text-primary",
    2: "text-gray-300",
    3: "text-amber-600"
  };

  return (
    <GlassCard className={cn(
      "overflow-hidden relative",
      isTopRank && rank === 1 && "border-primary shadow-[0_0_30px_rgba(255,255,0,0.4)]",
      className
    )}>
      {/* Rank badge */}
      {rank && (
        <div className={cn(
          "absolute top-4 right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl",
          isTopRank ? "bg-black/80" : "bg-card/80"
        )}>
          <span className={isTopRank ? rankColors[rank as 1 | 2 | 3] : "text-muted-foreground"}>
            {rank}
          </span>
        </div>
      )}

      {/* Vehicle image */}
      <div className="aspect-video bg-card/30 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${brand} ${model}`} 
            className="w-full h-full object-cover"
            data-testid="img-vehicle"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🚗</span>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-primary" data-testid="text-vehicle-name">
            {brand} <span className="text-foreground">{model}</span>
          </h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>

        <LicensePlate3D
          plateNumber={plateNumber}
          country={country}
          className="w-full"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground" data-testid="text-owner">
            {owner}
          </span>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-foreground font-semibold" data-testid="text-likes">{likes}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
