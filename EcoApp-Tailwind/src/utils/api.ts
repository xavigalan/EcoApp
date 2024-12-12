import { UserFormData, ApiResponse, UserWithRoleDTO} from '../types/User';
import { MapPoint, MapPointFormData } from '../types/MapPoints';

const API_BASE_URL = 'http://localhost:8080';

// User API
export async function fetchUsers(roleIds: number[]): Promise<UserWithRoleDTO[]> {
  const response = await fetch(`${API_BASE_URL}/users/roles/${roleIds.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function fetchUserById(id: number): Promise<UserWithRoleDTO> {
  const response = await fetch(`${API_BASE_URL}/users/${id}/with-role`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

export async function updateUser(id: number, userData: Partial<UserFormData>): Promise<UserWithRoleDTO> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
}

export async function registerUser(userData: UserFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Registration failed: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchRoles() {
  const response = await fetch(`${API_BASE_URL}/roles`);
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  return response.json();
}

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

export async function createMapPoint(data: MapPointFormData): Promise<MapPoint> {
  const response = await fetch(`${API_BASE_URL}/mappoints`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      latitude: parseFloat(String(data.latitude)),
      longitude: parseFloat(String(data.longitude)),
      typePoint: { id: parseInt(data.typePointId) }
    }),
  });
  if (!response.ok) throw new Error('Failed to create map point');
  return response.json();
}

export async function updateMapPoint(id: number, data: MapPointFormData): Promise<MapPoint> {
  const response = await fetch(`${API_BASE_URL}/mappoints/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      latitude: parseFloat(String(data.latitude)),
      longitude: parseFloat(String(data.longitude)),
      typePoint: { id: parseInt(data.typePointId) }
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