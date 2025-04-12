
import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import Taskbar from './Taskbar';
import MenuSystem from './MenuSystem';
import WindowManager from './WindowManager';
import { WindowType } from '@/types/window';

interface DesktopProps {
  username: string;
}

const Desktop = ({ username }: DesktopProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openWindow = (windowType: WindowType) => {
    // Check if the window is already open
    if (!openWindows.some(window => window.type === windowType.type)) {
      setOpenWindows([...openWindows, windowType]);
    }
    
    // Close menu after opening a window
    setIsMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(window => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(
      openWindows.map(window => 
        window.id === id 
          ? { ...window, minimized: !window.minimized } 
          : window
      )
    );
  };

  const focusWindow = (id: string) => {
    setOpenWindows([
      ...openWindows.filter(window => window.id !== id),
      ...openWindows.filter(window => window.id === id),
    ]);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-blue-900 to-gray-900 overflow-hidden">
      <div className="flex-1 relative">
        {isMenuOpen && (
          <MenuSystem 
            username={username} 
            onSelectOption={openWindow} 
            onClose={() => setIsMenuOpen(false)} 
          />
        )}
        <WindowManager 
          windows={openWindows} 
          onClose={closeWindow} 
          onMinimize={minimizeWindow}
          onFocus={focusWindow}
        />
      </div>
      <Taskbar 
        username={username} 
        onMenuClick={toggleMenu} 
        isMenuOpen={isMenuOpen} 
        openWindows={openWindows}
        onWindowClick={focusWindow}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Desktop;
