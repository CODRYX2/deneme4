import MenuHub from '../MenuHub';

export default function MenuHubExample() {
  const handleItemClick = (item: string) => {
    console.log(`Clicked menu item: ${item}`);
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">MENU</h2>
      <MenuHub onItemClick={handleItemClick} />
    </div>
  );
}
