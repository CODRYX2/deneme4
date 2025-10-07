import CrewCard from '../CrewCard';

export default function CrewCardExample() {
  return (
    <div className="bg-background p-6 space-y-4">
      <div>
        <h3 className="text-sm text-muted-foreground mb-2">OWNED CREWS</h3>
        <CrewCard
          name="CREW35"
          memberCount={1}
          founder="KAANI133"
          logoText="C35"
          badgeColor="bg-red-500"
        />
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground mb-2">CREW INVITES</h3>
        <p className="text-center text-muted-foreground py-8 text-sm">
          NO INVITES YET<br/>
          <span className="text-xs">Invites from crews will appear here</span>
        </p>
      </div>
    </div>
  );
}
