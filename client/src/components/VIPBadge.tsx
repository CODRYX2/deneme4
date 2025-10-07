import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VIPBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function VIPBadge({ className, size = "sm" }: VIPBadgeProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <Crown 
      className={cn(
        "text-primary fill-primary/20",
        sizeClasses[size],
        className
      )} 
      data-testid="badge-vip"
    />
  );
}
