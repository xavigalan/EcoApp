export interface Service {
    id: number;
    type: string;
    description: string;
    location: [number, number];
    timestamp: string;
    status: 'pending' | 'in_progress' | 'completed';
  }
  
  export type ServiceCreateDTO = Omit<Service, 'id' | 'timestamp' | 'status'>;