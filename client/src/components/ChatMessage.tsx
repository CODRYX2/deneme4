import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import VIPBadge from "./VIPBadge";

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
  isVIP?: boolean;
  avatarUrl?: string;
}

export default function ChatMessage({
  username,
  message,
  timestamp,
  isCurrentUser,
  isVIP,
  avatarUrl
}: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isCurrentUser && "flex-row-reverse"
    )}>
      <Avatar className="w-10 h-10 border border-primary/30">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-card text-foreground text-sm">
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "flex-1 max-w-[70%]",
        isCurrentUser && "flex flex-col items-end"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-sm font-semibold",
            isCurrentUser ? "text-primary" : "text-foreground"
          )} data-testid="text-username">
            {username}
          </span>
          {isVIP && <VIPBadge size="sm" />}
        </div>

        <div className={cn(
          "backdrop-blur-md rounded-2xl px-4 py-2",
          isCurrentUser 
            ? "bg-primary/90 text-black" 
            : "bg-card/30 text-foreground border border-primary/20"
        )}>
          <p className="text-sm" data-testid="text-message">{message}</p>
        </div>

        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
    </div>
  );
}
