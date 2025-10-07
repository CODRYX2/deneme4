import MomentCard from '../MomentCard';

export default function MomentCardExample() {
  return (
    <div className="bg-background p-6">
      <MomentCard
        username="FIRST2"
        isVIP={true}
        caption="New setup looking clean! 🔥"
        timeAgo="2 hours ago"
        likes={142}
      />
    </div>
  );
}
