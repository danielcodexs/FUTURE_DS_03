
import { LucideIcon } from "lucide-react";

export interface WindowType {
  id: string;
  type: 'city' | 'department' | 'profession' | 'about' | 'user' | string;
  title: string;
  icon?: LucideIcon;
  minimized: boolean;
}

export interface FormData {
  id: string;
  [key: string]: any;
}
