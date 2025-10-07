import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="bg-background p-6">
      <ChatMessage
        username="FIRST2"
        message="Hey! Anyone up for a meet this weekend?"
        timestamp="2 hours ago"
        isVIP={true}
      />
      <ChatMessage
        username="You"
        message="Yes! I'm in. What location?"
        timestamp="1 hour ago"
        isCurrentUser={true}
      />
      <ChatMessage
        username="KAANI133"
        message="Count me in too! 🏁"
        timestamp="30 min ago"
      />
    </div>
  );
}
