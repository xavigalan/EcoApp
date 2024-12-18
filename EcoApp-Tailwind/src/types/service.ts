export interface ServiceType {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  firstName: string;
  email: string;
}

export interface Service {
  id: number;
  userId: number; // Si necesitas el ID del usuario
  user: User;  // Incluye la información del usuario vinculado
  serviceTypeId: number;
  description: string;
  locationLatitude: number;
  locationLongitude: number;
  locationAddress: string;
  startDate: string | null;
  endDate: string | null;
  photoBefore: string | null;
  photoAfter: string | null;
  creationDate: string;
  status: 'pending' | 'in_progress' | 'completed';
}


export interface ServiceFormData {
  serviceTypeId: number;
  description: string;
  locationLatitude: number;
  locationLongitude: number;
  locationAddress: string;
  startDate: string | null;
  endDate: string | null;
  photoBefore: string | null;
  photoAfter: string | null;
  creationDate: string;
  status: 'pending' | 'in_progress' | 'completed';
}


export type ServiceCreateDTO = Omit<Service, 'id' | 'creationDate'>;