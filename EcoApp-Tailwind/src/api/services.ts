import { Service, ServiceCreateDTO } from '../types/service';

const API_URL = 'http://localhost:8080/services';

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

export const fetchServiceById = async (id: number): Promise<Service> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service');
  }
  return response.json();
};

export const createService = async (service: ServiceCreateDTO): Promise<Service> => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error('Failed to create service');
  }
  return response.json();
};

export const updateService = async (id: number, service: Partial<Service>): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error('Failed to update service');
  }
};