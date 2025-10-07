import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VIPBadge from "./VIPBadge";

interface MomentCardProps {
  username: string;
  isVIP?: boolean;
  imageUrl?: string;
  caption?: string;
  timeAgo: string;
  likes: number;
  avatarUrl?: string;
}

export default function MomentCard({
  username,
  isVIP,
  imageUrl,
  caption,
  timeAgo,
  likes,
  avatarUrl
}: MomentCardProps) {
  return (
    <div className="backdrop-blur-md bg-card/10 border border-primary/40 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <Avatar className="w-10 h-10 border border-primary/30">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-card text-foreground text-sm">
            {username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground" data-testid="text-username">{username}</span>
            {isVIP && <VIPBadge size="sm" />}
          </div>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-square bg-card/30 relative">
        {imageUrl ? (
          <img src={imageUrl} alt="Moment" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl">📸</span>
          </div>
        )}
      </div>

      {/* Actions & Caption */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover-elevate p-2 rounded-lg" data-testid="button-like">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-sm font-semibold text-foreground" data-testid="text-likes">{likes}</span>
          </button>
          <button className="hover-elevate p-2 rounded-lg" data-testid="button-comment">
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
          </button>
          <button className="hover-elevate p-2 rounded-lg" data-testid="button-share">
            <Share2 className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {caption && (
          <p className="text-sm text-foreground">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        )}
      </div>
    </div>
  );
}
