
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

const DepartmentForm = () => {
  const [departments, setDepartments] = useState<FormData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<FormData>({
    id: '',
    name: '',
    code: '',
    isActive: true
  });

  useEffect(() => {
    const loadedDepartments = getData('departments');
    setDepartments(loadedDepartments);
  }, []);

  const resetForm = () => {
    setCurrentDepartment({
      id: '',
      name: '',
      code: '',
      isActive: true
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentDepartment(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentDepartment(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment.name || !currentDepartment.code) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    let updatedDepartments;
    
    if (isEditing) {
      // Update existing department
      updatedDepartments = departments.map(department => 
        department.id === currentDepartment.id ? currentDepartment : department
      );
      toast.success(`Departamento "${currentDepartment.name}" actualizado correctamente`);
    } else {
      // Add new department
      const newDepartment = {
        ...currentDepartment,
        id: uuidv4()
      };
      updatedDepartments = [...departments, newDepartment];
      toast.success(`Departamento "${currentDepartment.name}" agregado correctamente`);
    }
    
    setDepartments(updatedDepartments);
    saveData('departments', updatedDepartments);
    resetForm();
  };

  const handleEdit = (department: FormData) => {
    setCurrentDepartment(department);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const departmentToDelete = departments.find(department => department.id === id);
    
    if (confirm(`¿Está seguro de eliminar el departamento "${departmentToDelete?.name}"?`)) {
      const updatedDepartments = departments.filter(department => department.id !== id);
      setDepartments(updatedDepartments);
      saveData('departments', updatedDepartments);
      toast.success(`Departamento eliminado correctamente`);
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
              value={currentDepartment.name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Nombre del departamento"
            />
          </div>
          <div>
            <Label htmlFor="code" className="text-white">Código</Label>
            <Input
              id="code"
              name="code"
              value={currentDepartment.code}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Código"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentDepartment.isActive}
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
            {departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No hay departamentos registrados</TableCell>
              </TableRow>
            ) : (
              departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.code}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      department.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {department.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(department)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(department.id)}
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

export default DepartmentForm;
