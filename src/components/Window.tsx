
import { Minus, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface WindowProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
}

const Window = ({
  title,
  icon: Icon,
  children,
  position,
  zIndex,
  onClose,
  onMinimize,
  onMouseDown,
  onClick,
}: WindowProps) => {
  return (
    <div
      className="absolute rounded-md overflow-hidden shadow-lg border border-white/10 bg-gray-800/90 backdrop-blur-md flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "700px",
        height: "500px",
        zIndex,
      }}
      onClick={onClick}
    >
      {/* Title bar */}
      <div
        className="h-10 bg-blue-900/80 flex items-center justify-between px-3 cursor-move"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-center">
          {Icon && <Icon className="h-4 w-4 mr-2 text-white" />}
          <span className="text-white font-medium truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="h-6 w-6 rounded flex items-center justify-center hover:bg-white/10 text-white"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={onClose}
            className="h-6 w-6 rounded flex items-center justify-center hover:bg-red-500/80 text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
};

export default Window;
