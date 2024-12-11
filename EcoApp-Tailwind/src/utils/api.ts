import { UserFormData, ApiResponse } from '../types/User';

const API_BASE_URL = 'http://localhost:8080';

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