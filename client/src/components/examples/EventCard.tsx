import EventCard from '../EventCard';

export default function EventCardExample() {
  return (
    <div className="bg-background p-6">
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
