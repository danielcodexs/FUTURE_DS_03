
import { Button } from "@/components/ui/button";
import {
  Building2, // Instead of City
  Map,
  Briefcase,
  Info,
  Users,
  LogOut,
} from "lucide-react";
import { WindowType } from "@/types/window";
import { v4 as uuidv4 } from "uuid";

interface MenuSystemProps {
  username: string;
  onSelectOption: (window: WindowType) => void;
  onClose: () => void;
}

const MenuSystem = ({ 
  username, 
  onSelectOption, 
  onClose 
}: MenuSystemProps) => {
  // Define menu items
  const menuItems = [
    {
      id: "cities",
      title: "Ciudades",
      icon: Building2,
      onClick: () => onSelectOption({
        id: uuidv4(),
        type: "city",
        title: "Gestión de Ciudades",
        icon: Building2,
        minimized: false
      })
    },
    {
      id: "departments",
      title: "Departamentos",
      icon: Map,
      onClick: () => onSelectOption({
        id: uuidv4(),
        type: "department",
        title: "Gestión de Departamentos",
        icon: Map,
        minimized: false
      })
    },
    {
      id: "professions",
      title: "Profesiones",
      icon: Briefcase,
      onClick: () => onSelectOption({
        id: uuidv4(),
        type: "profession",
        title: "Gestión de Profesiones",
        icon: Briefcase,
        minimized: false
      })
    },
    {
      id: "about",
      title: "Acerca de...",
      icon: Info,
      onClick: () => onSelectOption({
        id: uuidv4(),
        type: "about",
        title: "Acerca de...",
        icon: Info,
        minimized: false
      })
    },
    {
      id: "users",
      title: "Usuarios",
      icon: Users,
      onClick: () => onSelectOption({
        id: uuidv4(),
        type: "user",
        title: "Gestión de Usuarios",
        icon: Users,
        minimized: false
      })
    },
  ];

  // Handle click outside to close menu
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="absolute bottom-12 left-0 w-full h-[calc(100%-3rem)] z-40 bg-black/30"
      onClick={handleBackdropClick}
    >
      <div className="absolute bottom-0 left-0 w-64 bg-gray-800/95 backdrop-blur-md shadow-lg rounded-tr-lg border border-white/10 overflow-hidden">
        <div className="p-4 bg-blue-900/50 border-b border-white/10">
          <div className="font-medium text-white">Bienvenido, {username}</div>
          <div className="text-sm text-blue-200">Sistema de Gestión</div>
        </div>
        
        <div className="p-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start mb-1 text-white"
              onClick={item.onClick}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-2 border-t border-white/10">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-red-800/30"
            onClick={() => window.location.reload()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuSystem;
