import { ServiceType } from '../types/service';

const API_BASE_URL = 'http://localhost:8080';

export async function fetchTypePoints(): Promise<ServiceType[]> {
  const response = await fetch(`${API_BASE_URL}/servicetype`);
  if (!response.ok) throw new Error('Failed to fetch types services');
  return response.json();
}