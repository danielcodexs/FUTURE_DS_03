
import { FormData } from "@/types/window";

export const saveData = (key: string, data: FormData[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
    return false;
  }
};

export const getData = (key: string): FormData[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting data for ${key}:`, error);
    return [];
  }
};

// Initialize local storage with sample data if empty
export const initializeLocalStorage = () => {
  // Sample cities
  if (!localStorage.getItem('cities')) {
    const sampleCities = [
      { id: '1', name: 'Bogotá', code: 'BOG', isActive: true },
      { id: '2', name: 'Medellín', code: 'MED', isActive: true },
      { id: '3', name: 'Cali', code: 'CAL', isActive: true }
    ];
    saveData('cities', sampleCities);
  }

  // Sample departments
  if (!localStorage.getItem('departments')) {
    const sampleDepartments = [
      { id: '1', name: 'Cundinamarca', code: 'CUN', isActive: true },
      { id: '2', name: 'Antioquia', code: 'ANT', isActive: true },
      { id: '3', name: 'Valle del Cauca', code: 'VAL', isActive: true }
    ];
    saveData('departments', sampleDepartments);
  }

  // Sample professions
  if (!localStorage.getItem('professions')) {
    const sampleProfessions = [
      { id: '1', name: 'Ingeniero de Software', code: 'IS', isActive: true },
      { id: '2', name: 'Médico', code: 'MD', isActive: true },
      { id: '3', name: 'Arquitecto', code: 'ARQ', isActive: true }
    ];
    saveData('professions', sampleProfessions);
  }

  // Sample users
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      { id: '1', name: 'Juan Pérez', username: 'jperez', email: 'jperez@email.com', cityId: '1', departmentId: '1', professionId: '1', isActive: true },
      { id: '2', name: 'María Gómez', username: 'mgomez', email: 'mgomez@email.com', cityId: '2', departmentId: '2', professionId: '2', isActive: true }
    ];
    saveData('users', sampleUsers);
  }
};
