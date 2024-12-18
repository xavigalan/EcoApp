export interface ServiceType {
  id: number;
  name: string;
  description: string;
}

export interface Service {
  id: number;
  userId: number;
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