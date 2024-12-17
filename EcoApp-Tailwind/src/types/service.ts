export interface ServiceType {
  id: number;
  name: string;
  description: string;
}

export interface Service {
  id: number;
  userId: number;  // ID del usuario que solicitó el servicio
  serviceTypeId: number;  // ID del tipo de servicio (relación con service_types)
  description: string;  // Descripción del servicio
  locationLatitude: number;  // Latitud de la ubicación del servicio
  locationLongitude: number;  // Longitud de la ubicación del servicio
  locationAddress: string;  // Dirección del servicio (como una cadena de texto)
  startDate: string | null;  // Fecha y hora de inicio del servicio
  endDate: string | null;  // Fecha y hora de finalización del servicio
  photoBefore: string | null;  // URL de la foto antes de realizar el servicio
  photoAfter: string | null;  // URL de la foto después de realizar el servicio
  creationDate: string;  // Fecha y hora de creación del servicio
  status: 'pending' | 'in_progress' | 'completed';  // Estado del servicio
}

// Interfaz para la creación de un nuevo servicio (sin los campos autogenerados o calculados)
export type ServiceCreateDTO = Omit<Service, 'id' | 'creationDate'>;
