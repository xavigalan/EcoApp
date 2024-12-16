
import { MapPoint, PointFormData } from '../types/MapPoints';

const API_BASE_URL = 'http://localhost:8080';

export async function fetchMapPoints(): Promise<MapPoint[]> {
  const response = await fetch(`${API_BASE_URL}/mappoints/types`);
  if (!response.ok) throw new Error('Failed to fetch map points');
  return response.json();
}

export async function fetchMapPointById(id: number): Promise<MapPoint> {
  const response = await fetch(`${API_BASE_URL}/mappoints/types/${id}`);
  if (!response.ok) throw new Error('Failed to fetch map point');
  return response.json();
}

export async function createMapPoint(data: PointFormData): Promise<MapPoint> {
  const response = await fetch(`${API_BASE_URL}/mappoints`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      latitude: data.latitude,
      longitude: data.longitude,
      typePoint: { id: data.typeId }, // No es necesario parseInt
    }),
  });
  if (!response.ok) throw new Error('Failed to create map point');
  return response.json();
}

export async function updateMapPoint(id: number, data: PointFormData): Promise<MapPoint> {
  const response = await fetch(`${API_BASE_URL}/mappoints/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      latitude: data.latitude,
      longitude: data.longitude,
      typePoint: { id: data.typeId }, // No es necesario parseInt
    }),
  });
  if (!response.ok) throw new Error('Failed to update map point');
  return response.json();
}


export async function deleteMapPoint(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/mappoints/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete map point');
}