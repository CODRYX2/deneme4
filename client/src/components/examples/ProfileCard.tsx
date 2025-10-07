import ProfileCard from '../ProfileCard';

export default function ProfileCardExample() {
  return (
    <div className="bg-background min-h-screen p-6">
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
    </div>
  );
}
