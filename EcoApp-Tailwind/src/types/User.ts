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
  profilePicture: string;
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


export interface UserFormDataCard {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  roleId: string; 
  role: Role;
  profilePicture: string;
  creationDate: string;
  
}
