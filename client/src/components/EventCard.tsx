import { MapPin, Calendar, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import VIPBadge from "./VIPBadge";

interface EventCardProps {
  title: string;
  organizer: string;
  organizerVIP?: boolean;
  location: string;
  startDate: string;
  endDate: string;
  attendees: number;
  isPrivate?: boolean;
  collaborators?: string[];
}

export default function EventCard({
  title,
  organizer,
  organizerVIP,
  location,
  startDate,
  endDate,
  attendees,
  isPrivate,
  collaborators = []
}: EventCardProps) {
  return (
    <GlassCard className="p-4">
      {/* Mini map preview */}
      <div className="aspect-video bg-card/30 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1" data-testid="text-event-title">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Posted by</span>
            <span className="text-sm text-primary font-semibold">{organizer}</span>
            {organizerVIP && <VIPBadge size="sm" />}
          </div>
        </div>

        {collaborators.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-card/20 rounded">
            <span className="text-xs text-muted-foreground">IN COLLABORATION WITH</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center text-xs font-bold text-black">
                F2
              </div>
              <span className="text-xs text-primary font-semibold">{collaborators[0]}</span>
              <Star className="w-3 h-3 text-primary fill-primary" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-foreground" data-testid="text-location">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">STARTS</span>
                <span className="text-foreground">{startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">ENDS</span>
                <span className="text-foreground">{endDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground" data-testid="text-attendees">{attendees}</span>
            </div>
            {isPrivate && (
              <span className="text-xs bg-card/40 px-2 py-1 rounded text-muted-foreground">
                🔒 PRIVATE
              </span>
            )}
          </div>
        </div>

        <Button className="w-full" data-testid="button-join-event">
          JOIN EVENT
        </Button>
      </div>
    </GlassCard>
  );
}
