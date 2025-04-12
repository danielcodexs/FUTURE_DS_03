
import { useState, useRef } from 'react';
import { WindowType } from '@/types/window';
import CityForm from './forms/CityForm';
import DepartmentForm from './forms/DepartmentForm';
import ProfessionForm from './forms/ProfessionForm';
import AboutForm from './forms/AboutForm';
import UserForm from './forms/UserForm';
import Window from './Window';

interface WindowManagerProps {
  windows: WindowType[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

const WindowManager = ({ 
  windows, 
  onClose, 
  onMinimize,
  onFocus
}: WindowManagerProps) => {
  const [positions, setPositions] = useState<{ [key: string]: { x: number, y: number } }>({});
  const dragRef = useRef<{ id: string | null, startX: number, startY: number, offsetX: number, offsetY: number }>({
    id: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    // Focus the window being dragged
    onFocus(id);
    
    // Get current position or default
    const currentPos = positions[id] || { x: 0, y: 0 };
    
    // Set drag reference
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: currentPos.x,
      offsetY: currentPos.y
    };
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!dragRef.current.id) return;
    
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    setPositions(prev => ({
      ...prev,
      [dragRef.current.id!]: {
        x: dragRef.current.offsetX + deltaX,
        y: dragRef.current.offsetY + deltaY
      }
    }));
  };

  const handleDragEnd = () => {
    dragRef.current.id = null;
  };

  const handleWindowClick = (id: string) => {
    onFocus(id);
  };

  const getWindowComponent = (window: WindowType) => {
    switch (window.type) {
      case 'city':
        return <CityForm />;
      case 'department':
        return <DepartmentForm />;
      case 'profession':
        return <ProfessionForm />;
      case 'about':
        return <AboutForm />;
      case 'user':
        return <UserForm />;
      default:
        return <div>Ventana desconocida</div>;
    }
  };

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      {windows.map((window, index) => (
        !window.minimized && (
          <Window
            key={window.id}
            title={window.title}
            icon={window.icon}
            position={positions[window.id] || { x: 20 + index * 20, y: 20 + index * 20 }}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onMouseDown={(e) => handleDragStart(window.id, e)}
            onClick={() => handleWindowClick(window.id)}
            zIndex={100 + index}
          >
            {getWindowComponent(window)}
          </Window>
        )
      ))}
    </div>
  );
};

export default WindowManager;
