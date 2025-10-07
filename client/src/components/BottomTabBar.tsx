import { MessageSquare, Calendar, User, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = [
    { id: "map", label: "MAP", icon: "📍", route: "/" },
    { id: "chats", label: "CHATS", icon: MessageSquare, route: "/chats" },
    { id: "menu", label: "MENU", icon: "logo", route: "/menu", isCenter: true },
    { id: "moments", label: "MOMENTS", icon: Flame, route: "/moments" },
    { id: "profile", label: "PROFILE", icon: User, route: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-t border-primary/30">
      <div className="flex items-end justify-around px-4 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center -mt-6"
                data-testid={`tab-${tab.id}`}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-1 transition-all",
                  isActive 
                    ? "bg-primary shadow-[0_0_20px_rgba(255,255,0,0.6)]" 
                    : "bg-primary/80 hover-elevate"
                )}>
                  <div className="text-3xl font-black text-black">F2</div>
                </div>
                <span className={cn(
                  "text-xs font-semibold",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 py-2 hover-elevate active-elevate-2 px-3 rounded-lg transition-all"
              data-testid={`tab-${tab.id}`}
            >
              {typeof Icon === "string" ? (
                <span className="text-2xl">{Icon}</span>
              ) : (
                <Icon className={cn(
                  "w-6 h-6",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
              )}
              <span className={cn(
                "text-xs font-semibold",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
