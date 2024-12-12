export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  roleId: string;
}

export interface ApiResponse {
  token: string;
  userId: string;
  message?: string;
}