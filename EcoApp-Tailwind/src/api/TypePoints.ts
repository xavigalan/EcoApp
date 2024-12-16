import { TypePoint } from '../types/MapPoints';

const API_BASE_URL = 'http://localhost:8080';

export async function fetchTypePoints(): Promise<TypePoint[]> {
  const response = await fetch(`${API_BASE_URL}/typepoints`);
  if (!response.ok) throw new Error('Failed to fetch type points');
  return response.json();
}