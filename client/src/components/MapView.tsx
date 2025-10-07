import { Bell, Layers, HelpCircle, Navigation } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface MapViewProps {
  userLocation?: string;
  speed?: number;
  nearbySticker?: {
    name: string;
    distance: string;
  };
}

export default function MapView({ userLocation = "İzmir", speed = 0, nearbySticker }: MapViewProps) {
  return (
    <div className="relative w-full h-screen bg-[#1a1d2e]">
      {/* Mock map background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Map lines simulation */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <path d="M 100 400 Q 200 300, 300 350 T 500 300" stroke="white" strokeWidth="2" fill="none" />
        <path d="M 50 200 Q 150 100, 250 150 T 450 200" stroke="white" strokeWidth="3" fill="none" />
        <path d="M 200 500 Q 300 400, 400 450 T 600 400" stroke="white" strokeWidth="2" fill="none" />
      </svg>

      {/* User location marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(255,255,0,0.6)]">
            <span className="text-black font-bold text-sm">You</span>
          </div>
        </div>
      </div>

      {/* Top status bar */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <div className="text-white">
          <p className="text-sm font-semibold">{userLocation}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-primary">{speed} KM/H</span>
          </div>
        </div>
        <div className="text-right text-white">
          <p className="text-xs text-muted-foreground">12:13 AM</p>
        </div>
      </div>

      {/* Nearby sticker notification */}
      {nearbySticker && (
        <div className="absolute bottom-32 left-4 right-4">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-black font-bold text-xs">
                  ZERO
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">STICKER</p>
                  <p className="text-xs text-primary">{nearbySticker.name}</p>
                  <p className="text-xs text-muted-foreground">You're {nearbySticker.distance} away. Get the Zero Limits sticker</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-black rounded-lg font-bold text-sm" data-testid="button-claim-sticker">
                CLAIMED
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Right side controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-3">
        <button className="w-12 h-12 backdrop-blur-md bg-card/20 border border-primary/30 rounded-full flex items-center justify-center hover-elevate" data-testid="button-notifications">
          <Bell className="w-6 h-6 text-foreground" />
        </button>
        <button className="w-12 h-12 backdrop-blur-md bg-card/20 border border-primary/30 rounded-full flex items-center justify-center hover-elevate" data-testid="button-layers">
          <Layers className="w-6 h-6 text-foreground" />
        </button>
        <button className="w-12 h-12 backdrop-blur-md bg-card/20 border border-primary/30 rounded-full flex items-center justify-center hover-elevate" data-testid="button-help">
          <HelpCircle className="w-6 h-6 text-foreground" />
        </button>
        <button className="w-12 h-12 backdrop-blur-md bg-card/20 border border-primary/30 rounded-full flex items-center justify-center hover-elevate" data-testid="button-navigation">
          <Navigation className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}
