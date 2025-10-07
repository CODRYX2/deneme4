import { useState } from "react";
import { Instagram, Edit, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GlassCard from "./GlassCard";
import VIPBadge from "./VIPBadge";
import LicensePlate3D from "./LicensePlate3D";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  username: string;
  isVIP?: boolean;
  profileImage?: string;
  primaryVehicle?: {
    plateNumber: string;
    country: "TR" | "DE" | "US";
  };
  bio?: string;
  socialLinks?: Array<{
    platform: string;
    username: string;
    url: string;
  }>;
}

export default function ProfileCard({
  username,
  isVIP,
  profileImage,
  primaryVehicle,
  bio,
  socialLinks = []
}: ProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={cn(
          "relative w-full h-80 transition-transform duration-600 transform-style-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <GlassCard className="p-6 h-full bg-gradient-to-br from-primary/20 to-transparent">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-2 border-primary" data-testid="img-avatar">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="bg-primary text-black text-2xl font-bold">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-primary" data-testid="text-username">{username}</h2>
                  {isVIP && <VIPBadge size="md" />}
                </div>
                <p className="text-sm text-muted-foreground">Tap card to flip</p>
              </div>

              {primaryVehicle && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Primary Vehicle</p>
                  <LicensePlate3D
                    plateNumber={primaryVehicle.plateNumber}
                    country={primaryVehicle.country}
                    style={isVIP ? "chrome" : "standard"}
                  />
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <GlassCard className="p-6 h-full bg-gradient-to-br from-primary/20 to-transparent">
            <div className="flex flex-col gap-4 h-full">
              <h3 className="text-lg font-bold text-primary">Bio & Links</h3>
              
              <p className="text-sm text-foreground flex-1" data-testid="text-bio">
                {bio || "No bio yet..."}
              </p>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Social Links</p>
                {socialLinks.length > 0 ? (
                  socialLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-card/30">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{link.username}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8" data-testid={`button-link-${idx}`}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No links added</p>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Button className="w-full mt-4" variant="outline" data-testid="button-edit-profile">
        <Edit className="w-4 h-4 mr-2" />
        EDIT PROFILE
      </Button>
    </div>
  );
}
