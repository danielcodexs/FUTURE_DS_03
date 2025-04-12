
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Code, Heart } from "lucide-react";

const AboutForm = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Card className="bg-gray-900/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Info className="h-6 w-6 mr-2" /> Acerca del Sistema
          </CardTitle>
          <CardDescription className="text-gray-300">
            Sistema de Gestión CRUD - Proyecto Final
          </CardDescription>
          <Separator className="bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-4 text-gray-200">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p>
              Este sistema permite gestionar un conjunto de entidades básicas a través de operaciones CRUD 
              (Crear, Leer, Actualizar y Eliminar). Incluye gestión de Ciudades, Departamentos, 
              Profesiones y Usuarios, todo integrado en una interfaz de escritorio intuitiva.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Características</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestión completa de entidades con operaciones CRUD</li>
              <li>Interfaz de escritorio intuitiva con ventanas desplegables</li>
              <li>Almacenamiento local persistente de datos</li>
              <li>Validación de formularios</li>
              <li>Sistema de notificaciones para operaciones exitosas y fallidas</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tecnologías Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-900/30 px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-blue-900/30 px-3 py-1 rounded-full text-sm">TypeScript</span>
              <span className="bg-blue-900/30 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
              <span className="bg-blue-900/30 px-3 py-1 rounded-full text-sm">ShadCN UI</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-400 border-t border-white/10 pt-4">
          <div className="flex items-center">
            <Code className="h-4 w-4 mr-1" />
            <span>Versión 1.0.0</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1 text-red-500" />
            <span>Proyecto Final - 2025</span>
          </div>
        </CardFooter>
      </Card>
      
      <Card className="bg-gray-900/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Desarrollado por</CardTitle>
          <Separator className="bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-4 text-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Nombre:</Label>
              <p className="text-white font-medium">Estudiante</p>
            </div>
            <div>
              <Label className="text-gray-400">Código:</Label>
              <p className="text-white font-medium">EST12345</p>
            </div>
            <div>
              <Label className="text-gray-400">Asignatura:</Label>
              <p className="text-white font-medium">Programación</p>
            </div>
            <div>
              <Label className="text-gray-400">Fecha:</Label>
              <p className="text-white font-medium">Abril 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add missing import
import { Info } from "lucide-react";

export default AboutForm;
