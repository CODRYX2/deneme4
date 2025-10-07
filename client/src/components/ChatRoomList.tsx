import { Search, MapPin, Users as UsersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import GlassCard from "./GlassCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatRoom {
  id: string;
  name: string;
  type: "local" | "crew" | "event" | "friend";
  lastMessage?: string;
  memberCount?: number;
  unread?: number;
  timestamp?: string;
}

export default function ChatRoomList() {
  //todo: remove mock functionality
  const rooms: ChatRoom[] = [
    {
      id: "1",
      type: "local",
      name: "LOCAL CHAT",
      memberCount: 1,
      lastMessage: "NO MESSAGES"
    },
    {
      id: "2",
      type: "crew",
      name: "FIRST3",
      memberCount: 2,
      timestamp: "2 HOURS AGO"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md pb-4">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">CHATS</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-card/30 border-primary/30"
            data-testid="input-search-chat"
          />
        </div>
      </div>

      {/* Local Chat */}
      <div>
        <GlassCard className="p-4 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground" data-testid="text-chat-local">LOCAL CHAT</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <UsersIcon className="w-3 h-3" />
                <span>1</span>
                <span className="ml-2">NO MESSAGES</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Crews */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground mb-2">CREWS</h3>
        <GlassCard className="p-4 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-primary">
              <AvatarFallback className="text-black font-black">F2</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-foreground" data-testid="text-chat-crew">FIRST3</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <UsersIcon className="w-3 h-3" />
                <span>2</span>
                <span className="ml-2">2 HOURS AGO</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Events */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground mb-2">EVENTS</h3>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">ATTEND AN EVENT TO JOIN ITS CHAT</p>
        </div>
      </div>

      {/* Friends */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground mb-2">FRIENDS</h3>
        <div className="flex items-center gap-3 p-4">
          <Avatar className="w-12 h-12 bg-red-500 border-2 border-primary">
            <AvatarFallback className="text-white font-black text-lg">F2</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">FIRST2</h3>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">@</span>
              <span className="text-primary">SPORTS CLUB US</span>
              <span className="text-muted-foreground">• 8 DAYS AGO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
