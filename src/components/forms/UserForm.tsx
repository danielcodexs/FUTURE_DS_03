
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormData } from "@/types/window";
import { getData, saveData } from "@/utils/localStorage";
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const UserForm = () => {
  const [users, setUsers] = useState<FormData[]>([]);
  const [cities, setCities] = useState<FormData[]>([]);
  const [departments, setDepartments] = useState<FormData[]>([]);
  const [professions, setProfessions] = useState<FormData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<FormData>({
    id: '',
    name: '',
    username: '',
    email: '',
    cityId: '',
    departmentId: '',
    professionId: '',
    isActive: true
  });

  useEffect(() => {
    // Initialize local storage if needed
    try {
      const loadedUsers = getData('users');
      const loadedCities = getData('cities');
      const loadedDepartments = getData('departments');
      const loadedProfessions = getData('professions');
      
      setUsers(loadedUsers);
      setCities(loadedCities);
      setDepartments(loadedDepartments);
      setProfessions(loadedProfessions);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Error al cargar los datos");
    }
  }, []);

  const resetForm = () => {
    setCurrentUser({
      id: '',
      name: '',
      username: '',
      email: '',
      cityId: '',
      departmentId: '',
      professionId: '',
      isActive: true
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentUser(prev => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser.name || !currentUser.username || !currentUser.email || 
        !currentUser.cityId || !currentUser.departmentId || !currentUser.professionId) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    let updatedUsers;
    
    if (isEditing) {
      // Update existing user
      updatedUsers = users.map(user => 
        user.id === currentUser.id ? currentUser : user
      );
      toast.success(`Usuario "${currentUser.name}" actualizado correctamente`);
    } else {
      // Add new user
      const newUser = {
        ...currentUser,
        id: uuidv4()
      };
      updatedUsers = [...users, newUser];
      toast.success(`Usuario "${currentUser.name}" agregado correctamente`);
    }
    
    setUsers(updatedUsers);
    saveData('users', updatedUsers);
    resetForm();
  };

  const handleEdit = (user: FormData) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    
    if (confirm(`¿Está seguro de eliminar el usuario "${userToDelete?.name}"?`)) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      saveData('users', updatedUsers);
      toast.success(`Usuario eliminado correctamente`);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const getCityName = (cityId: string) => {
    const city = cities.find(city => city.id === cityId);
    return city ? city.name : 'No asignado';
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'No asignado';
  };

  const getProfessionName = (professionId: string) => {
    const profession = professions.find(prof => prof.id === professionId);
    return profession ? profession.name : 'No asignado';
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="border rounded-md p-4 mb-4 bg-gray-900/50">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="name" className="text-white">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              value={currentUser.name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-white">Nombre de Usuario</Label>
            <Input
              id="username"
              name="username"
              value={currentUser.username}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={currentUser.email}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Correo electrónico"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="cityId" className="text-white">Ciudad</Label>
            <Select 
              value={currentUser.cityId} 
              onValueChange={(value) => handleSelectChange('cityId', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Seleccione una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departmentId" className="text-white">Departamento</Label>
            <Select 
              value={currentUser.departmentId} 
              onValueChange={(value) => handleSelectChange('departmentId', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Seleccione un departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="professionId" className="text-white">Profesión</Label>
            <Select 
              value={currentUser.professionId} 
              onValueChange={(value) => handleSelectChange('professionId', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Seleccione una profesión" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem key={profession.id} value={profession.id}>
                    {profession.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentUser.isActive}
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
              <TableHead>Nombre</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Profesión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No hay usuarios registrados</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getCityName(user.cityId)}</TableCell>
                  <TableCell>{getDepartmentName(user.departmentId)}</TableCell>
                  <TableCell>{getProfessionName(user.professionId)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(user.id)}
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

export default UserForm;
