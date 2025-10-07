import StickerDisplay from '../StickerDisplay';

export default function StickerDisplayExample() {
  return (
    <div className="bg-background p-6">
      <StickerDisplay
        name="ZERO LIMITS"
        description="Get the Zero Limits sticker"
        isCollected={true}
      />
    </div>
  );
}
