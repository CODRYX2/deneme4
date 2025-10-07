import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export default function GlassCard({ children, className, noBorder }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-card/10 rounded-xl shadow-lg",
        !noBorder && "border border-primary/60",
        className
      )}
    >
      {children}
    </div>
  );
}
