
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

const ProfessionForm = () => {
  const [professions, setProfessions] = useState<FormData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfession, setCurrentProfession] = useState<FormData>({
    id: '',
    name: '',
    code: '',
    isActive: true
  });

  useEffect(() => {
    const loadedProfessions = getData('professions');
    setProfessions(loadedProfessions);
  }, []);

  const resetForm = () => {
    setCurrentProfession({
      id: '',
      name: '',
      code: '',
      isActive: true
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProfession(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentProfession(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProfession.name || !currentProfession.code) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    let updatedProfessions;
    
    if (isEditing) {
      // Update existing profession
      updatedProfessions = professions.map(profession => 
        profession.id === currentProfession.id ? currentProfession : profession
      );
      toast.success(`Profesión "${currentProfession.name}" actualizada correctamente`);
    } else {
      // Add new profession
      const newProfession = {
        ...currentProfession,
        id: uuidv4()
      };
      updatedProfessions = [...professions, newProfession];
      toast.success(`Profesión "${currentProfession.name}" agregada correctamente`);
    }
    
    setProfessions(updatedProfessions);
    saveData('professions', updatedProfessions);
    resetForm();
  };

  const handleEdit = (profession: FormData) => {
    setCurrentProfession(profession);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const professionToDelete = professions.find(profession => profession.id === id);
    
    if (confirm(`¿Está seguro de eliminar la profesión "${professionToDelete?.name}"?`)) {
      const updatedProfessions = professions.filter(profession => profession.id !== id);
      setProfessions(updatedProfessions);
      saveData('professions', updatedProfessions);
      toast.success(`Profesión eliminada correctamente`);
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
              value={currentProfession.name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Nombre de la profesión"
            />
          </div>
          <div>
            <Label htmlFor="code" className="text-white">Código</Label>
            <Input
              id="code"
              name="code"
              value={currentProfession.code}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Código"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentProfession.isActive}
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
            {professions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No hay profesiones registradas</TableCell>
              </TableRow>
            ) : (
              professions.map((profession) => (
                <TableRow key={profession.id}>
                  <TableCell className="font-medium">{profession.code}</TableCell>
                  <TableCell>{profession.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      profession.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {profession.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(profession)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(profession.id)}
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

export default ProfessionForm;
