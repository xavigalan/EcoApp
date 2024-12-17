export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface ApiResponse {
  token: string;
  userId: string;
  message?: string;
}

export interface UserWithRoleDTO {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  creationDate: string;
  role: number;
  profilePicture: string | File;
}


export interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
}

