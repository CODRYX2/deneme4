import VIPBadge from '../VIPBadge';

export default function VIPBadgeExample() {
  return (
    <div className="p-4 bg-background flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-foreground">Username</span>
        <VIPBadge size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-foreground">Username</span>
        <VIPBadge size="md" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-foreground">Username</span>
        <VIPBadge size="lg" />
      </div>
    </div>
  );
}
