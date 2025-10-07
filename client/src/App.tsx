import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomTabBar from "@/components/BottomTabBar";
import MapView from "@/components/MapView";
import MenuHub from "@/components/MenuHub";
import ProfileCard from "@/components/ProfileCard";
import ChatRoomList from "@/components/ChatRoomList";
import MomentCard from "@/components/MomentCard";
import EventCard from "@/components/EventCard";
import VehicleCard from "@/components/VehicleCard";
import CrewCard from "@/components/CrewCard";
import StickerDisplay from "@/components/StickerDisplay";
import AlertCreator from "@/components/AlertCreator";
import GarageView from "@/components/GarageView";
import GlassCard from "@/components/GlassCard";

function MapPage() {
  return (
    <div className="h-screen relative">
      <MapView
        userLocation="İzmir"
        speed={1}
        nearbySticker={{
          name: "Zero Limits",
          distance: "240M"
        }}
      />
    </div>
  );
}

function ChatsPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <ChatRoomList />
    </div>
  );
}

function MenuPage() {
  const [, setLocation] = useLocation();
  
  const handleMenuClick = (item: string) => {
    console.log(`Menu item clicked: ${item}`);
    setLocation(`/menu/${item}`);
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">MENU</h2>
      <MenuHub onItemClick={handleMenuClick} />
    </div>
  );
}

function MomentsPage() {
  //todo: remove mock functionality
  return (
    <div className="min-h-screen pb-24 pt-6 px-4 space-y-6">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">MOMENTS</h2>
      <MomentCard
        username="FIRST2"
        isVIP={true}
        caption="New setup looking clean! 🔥"
        timeAgo="2 hours ago"
        likes={142}
      />
      <MomentCard
        username="KAANI133"
        caption="Weekend cruise with the crew"
        timeAgo="5 hours ago"
        likes={89}
      />
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <ProfileCard
        username="PANDACOOPERSS"
        isVIP={true}
        primaryVehicle={{
          plateNumber: "MINI ANKARA",
          country: "TR"
        }}
        bio="Car enthusiast from Istanbul. Love classic MINIs and weekend drives! 🏁"
        socialLinks={[
          {
            platform: "Instagram",
            username: "instagram.com",
            url: "https://instagram.com/example"
          }
        ]}
      />

      <div className="mt-8 space-y-6">
        <GarageView />
        
        <div>
          <h3 className="text-lg font-bold text-muted-foreground mb-4">STICKERS</h3>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-xs">ZERO</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">My Stickers</p>
                  <p className="text-xs text-muted-foreground">
                    Collect stickers by completing achievements and joining events
                  </p>
                </div>
              </div>
              <button className="text-primary" data-testid="button-view-stickers">→</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function VehiclesPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">VEHICLES</h2>
      <div className="space-y-6">
        <VehicleCard
          rank={1}
          brand="HYUNDAI"
          model="I20 N"
          year={2024}
          plateNumber="A4 ALI4NUN"
          country="TR"
          owner="ALI4NUN"
          likes={337}
        />
        <VehicleCard
          rank={2}
          brand="MERCEDES-BENZ"
          model="C-Class"
          year={2017}
          plateNumber="KA KAVAA"
          country="DE"
          owner="COUPEPHANTOM"
          likes={220}
        />
        <VehicleCard
          rank={3}
          brand="BMW"
          model="420"
          year={2021}
          plateNumber="CO COUPEPHANTOM"
          country="US"
          owner="COUPEPHANTOM"
          likes={194}
        />
      </div>
    </div>
  );
}

function CrewsPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">MY CREWS</h2>
      <GlassCard className="p-6 mb-6 bg-gradient-to-br from-primary/20 to-transparent">
        <div className="text-center mb-4">
          <span className="text-4xl mb-2 block">👥</span>
          <h3 className="text-primary text-lg font-bold mb-2">CREATE A CREW →</h3>
          <p className="text-sm text-muted-foreground">
            Choose your own brand style, organize crew-only events & chat privately with your crew
          </p>
        </div>
      </GlassCard>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-muted-foreground mb-3">OWNED CREWS</h3>
          <CrewCard
            name="CREW35"
            memberCount={1}
            founder="KAANI133"
            logoText="C35"
            badgeColor="bg-red-500"
          />
        </div>

        <div>
          <h3 className="text-sm font-bold text-muted-foreground mb-3">CREW INVITES</h3>
          <div className="text-center py-12">
            <p className="text-foreground font-semibold mb-1">NO INVITES YET</p>
            <p className="text-xs text-muted-foreground">
              Invites from crews will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">EVENTS</h2>
      <EventCard
        title="NOSHOW"
        organizer="SPORTS CLUB US"
        organizerVIP={true}
        location="NOPE"
        startDate="MON 24 FEB 2025 @ 21:17"
        endDate="MON 24 FEB 2025 @ 22:17"
        attendees={2}
        isPrivate={true}
        collaborators={["FIRST3"]}
      />
    </div>
  );
}

function AlertPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <AlertCreator />
    </div>
  );
}

function StickersPage() {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <StickerDisplay
        name="ZERO LIMITS"
        description="Get the Zero Limits sticker"
        isCollected={true}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MapPage} />
      <Route path="/chats" component={ChatsPage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/menu/vehicles" component={VehiclesPage} />
      <Route path="/menu/crews" component={CrewsPage} />
      <Route path="/menu/alert" component={AlertPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/stickers" component={StickersPage} />
      <Route path="/moments" component={MomentsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Page not found</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    if (location === "/chats") return "chats";
    if (location === "/moments") return "moments";
    if (location === "/profile") return "profile";
    if (location.startsWith("/menu")) return "menu";
    return "map";
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const routes: Record<string, string> = {
      map: "/",
      chats: "/chats",
      menu: "/menu",
      moments: "/moments",
      profile: "/profile"
    };
    setLocation(routes[tab] || "/");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Router />
          <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
