import GlassCard from '../GlassCard';

export default function GlassCardExample() {
  return (
    <div className="p-4 bg-background">
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">Glass Card</h3>
        <p className="text-muted-foreground">This is a glassmorphic card with backdrop blur</p>
      </GlassCard>
    </div>
  );
}
