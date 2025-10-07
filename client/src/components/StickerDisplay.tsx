import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";

interface StickerDisplayProps {
  name: string;
  description: string;
  isCollected?: boolean;
}

export default function StickerDisplay({ name, description, isCollected }: StickerDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Large sticker preview */}
      <GlassCard className="aspect-square flex items-center justify-center bg-gradient-to-br from-red-500/20 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transform rotate-12">
            <div className="text-6xl font-black text-primary mb-2" style={{ 
              textShadow: "0 0 20px rgba(255,255,0,0.8)"
            }}>
              ZERO
            </div>
            <div className="text-4xl font-black text-foreground" style={{
              textShadow: "0 0 20px rgba(255,255,0,0.6)"
            }}>
              FIRST2<br/>LIMITS
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Info */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-primary" data-testid="text-sticker-name">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* My Stickers section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-foreground">MY STICKERS</h4>
          <span className="text-xs text-primary">TAP TO ADD / SELECT STICKER</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="p-4 text-center hover-elevate cursor-pointer">
            <div className="text-2xl font-black text-primary mb-1">ZERO<br/>FIRST2<br/>LIMITS</div>
            <p className="text-xs text-foreground font-semibold">{name}</p>
            {isCollected && (
              <Button size="sm" variant="destructive" className="mt-2 w-full text-xs" data-testid="button-remove">
                REMOVE
              </Button>
            )}
          </GlassCard>
        </div>
      </div>

      <Button className="w-full" data-testid="button-save">SAVE</Button>

      <p className="text-xs text-center text-muted-foreground px-4">
        Collect stickers by completing achievements and joining events. You can display stickers in your profile card after unlocking them.
      </p>
    </div>
  );
}
