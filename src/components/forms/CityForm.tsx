
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormData } from "@/types/window";
import { getData, saveData } from "@/utils/localStorage";
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const CityForm = () => {
  const [cities, setCities] = useState<FormData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCity, setCurrentCity] = useState<FormData>({
    id: '',
    name: '',
    code: '',
    isActive: true
  });

  useEffect(() => {
    const loadedCities = getData('cities');
    setCities(loadedCities);
  }, []);

  const resetForm = () => {
    setCurrentCity({
      id: '',
      name: '',
      code: '',
      isActive: true
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCity(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentCity(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentCity.name || !currentCity.code) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    let updatedCities;
    
    if (isEditing) {
      // Update existing city
      updatedCities = cities.map(city => 
        city.id === currentCity.id ? currentCity : city
      );
      toast.success(`Ciudad "${currentCity.name}" actualizada correctamente`);
    } else {
      // Add new city
      const newCity = {
        ...currentCity,
        id: uuidv4()
      };
      updatedCities = [...cities, newCity];
      toast.success(`Ciudad "${currentCity.name}" agregada correctamente`);
    }
    
    setCities(updatedCities);
    saveData('cities', updatedCities);
    resetForm();
  };

  const handleEdit = (city: FormData) => {
    setCurrentCity(city);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const cityToDelete = cities.find(city => city.id === id);
    
    if (confirm(`¿Está seguro de eliminar la ciudad "${cityToDelete?.name}"?`)) {
      const updatedCities = cities.filter(city => city.id !== id);
      setCities(updatedCities);
      saveData('cities', updatedCities);
      toast.success(`Ciudad eliminada correctamente`);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="border rounded-md p-4 mb-4 bg-gray-900/50">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="name" className="text-white">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={currentCity.name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Nombre de la ciudad"
            />
          </div>
          <div>
            <Label htmlFor="code" className="text-white">Código</Label>
            <Input
              id="code"
              name="code"
              value={currentCity.code}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Código"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentCity.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="status" className="text-white">Activo</Label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
          >
            <X className="h-4 w-4 mr-1" /> Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEditing ? (
              <><Save className="h-4 w-4 mr-1" /> Actualizar</>
            ) : (
              <><PlusCircle className="h-4 w-4 mr-1" /> Agregar</>
            )}
          </Button>
        </div>
      </form>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No hay ciudades registradas</TableCell>
              </TableRow>
            ) : (
              cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.code}</TableCell>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      city.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {city.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(city)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(city.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CityForm;
