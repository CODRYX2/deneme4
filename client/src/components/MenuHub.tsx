import { Scan, HeadphonesIcon, Car, AlertTriangle, MapPin, Users, UserPlus, Navigation, Search } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface MenuHubProps {
  onItemClick?: (item: string) => void;
}

export default function MenuHub({ onItemClick }: MenuHubProps) {
  const menuItems = [
    { id: "scan", label: "SCAN", icon: Scan },
    { id: "support", label: "SUPPORT", icon: HeadphonesIcon, badge: "NEW" },
    { id: "vehicles", label: "VEHICLES", icon: Car },
    { id: "alert", label: "ALERT", icon: AlertTriangle },
    { id: "tours", label: "TOURS", icon: MapPin },
    { id: "friends", label: "FRIENDS", icon: UserPlus },
    { id: "crews", label: "CREWS", icon: Users },
    { id: "drive", label: "DRIVE", icon: Navigation },
    { id: "search", label: "SEARCH", icon: Search },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isHighlighted = item.id === "support";

        return (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className="relative"
            data-testid={`menu-${item.id}`}
          >
            <GlassCard className={cn(
              "p-6 flex flex-col items-center gap-3 hover-elevate active-elevate-2 transition-all",
              isHighlighted && "bg-primary/20 border-primary"
            )}>
              <Icon className="w-8 h-8 text-foreground" />
              <span className="text-xs font-bold text-foreground tracking-wide">
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute top-2 right-2 bg-primary text-black text-xs px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </GlassCard>
          </button>
        );
      })}
    </div>
  );
}
