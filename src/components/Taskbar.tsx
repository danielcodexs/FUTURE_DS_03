
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { WindowType } from "@/types/window";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface TaskbarProps {
  username: string;
  isMenuOpen: boolean;
  onMenuClick: () => void;
  openWindows: WindowType[];
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ 
  username, 
  isMenuOpen, 
  onMenuClick, 
  openWindows,
  onWindowClick
}: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 bg-gray-800/80 backdrop-blur-md border-t border-white/10 flex items-center px-2 z-50">
      <Button 
        variant={isMenuOpen ? "secondary" : "ghost"} 
        size="sm" 
        className="mr-2" 
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5 mr-2" />
        Inicio
      </Button>

      <div className="flex-1 flex gap-1 overflow-x-auto px-2">
        {openWindows.map((window) => (
          <Button
            key={window.id}
            variant="ghost"
            size="sm"
            className={`flex items-center px-3 text-xs ${
              !window.minimized ? "bg-white/10" : ""
            }`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.icon && <window.icon className="h-4 w-4 mr-2" />}
            {window.title}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-300">
          {format(currentTime, "HH:mm")}
        </div>
        <div className="flex items-center bg-blue-600/30 px-2 py-1 rounded text-xs">
          <User className="h-3 w-3 mr-1" />
          {username}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
