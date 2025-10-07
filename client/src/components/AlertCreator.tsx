import { Shield, Camera, Car, AlertTriangle, Clock, HelpCircle, Zap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

export default function AlertCreator() {
  const presetAlerts = [
    { icon: Shield, label: "Police", color: "text-blue-500" },
    { icon: Camera, label: "Camera", color: "text-red-500" },
    { icon: Car, label: "Traffic", color: "text-orange-500" },
  ];

  const customAlerts = [
    { icon: Camera, label: "Camera" },
    { icon: Car, label: "Vehicle" },
    { icon: AlertTriangle, label: "Warning" },
    { icon: Clock, label: "Time" },
    { icon: HelpCircle, label: "Help" },
    { icon: Zap, label: "Speed" },
    { icon: Wrench, label: "Service" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">CREATE ALERT</h2>

        {/* Preset Alerts */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-foreground mb-3">PRESET ALERTS</h3>
          <div className="flex gap-4">
            {presetAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <button
                  key={alert.label}
                  className="flex-1"
                  data-testid={`button-preset-${alert.label.toLowerCase()}`}
                >
                  <GlassCard className="p-6 hover-elevate active-elevate-2 transition-all">
                    <Icon className={cn("w-12 h-12 mx-auto mb-2", alert.color)} />
                    <p className="text-sm font-semibold text-foreground text-center">{alert.label}</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      {alert.label === "Police" && "Police spotted"}
                    </p>
                  </GlassCard>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Alerts */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">CUSTOM ALERTS</h3>
          <div className="grid grid-cols-4 gap-3">
            {customAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <button
                  key={alert.label}
                  className="aspect-square"
                  data-testid={`button-custom-${alert.label.toLowerCase()}`}
                >
                  <GlassCard className="w-full h-full flex items-center justify-center hover-elevate active-elevate-2 transition-all">
                    <Icon className="w-8 h-8 text-foreground" />
                  </GlassCard>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg" data-testid="button-create-alert">
        CREATE ALERT
      </Button>
    </div>
  );
}
