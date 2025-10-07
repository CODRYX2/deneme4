import { Users, Settings } from "lucide-react";
import GlassCard from "./GlassCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CrewCardProps {
  name: string;
  memberCount: number;
  founder: string;
  logoText?: string;
  badgeColor?: string;
}

export default function CrewCard({
  name,
  memberCount,
  founder,
  logoText = "F2",
  badgeColor = "bg-primary"
}: CrewCardProps) {
  return (
    <GlassCard className="p-4 hover-elevate active-elevate-2 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <Avatar className={`w-12 h-12 ${badgeColor}`}>
          <AvatarFallback className="text-black font-black text-lg">
            {logoText}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-bold text-foreground" data-testid="text-crew-name">{name}</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span data-testid="text-member-count">{memberCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-3 h-3" />
              <span>{founder}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
