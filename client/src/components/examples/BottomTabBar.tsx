import { useState } from 'react';
import BottomTabBar from '../BottomTabBar';

export default function BottomTabBarExample() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="h-[200px] bg-background relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground">Active tab: <span className="text-primary font-semibold">{activeTab}</span></p>
      </div>
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
