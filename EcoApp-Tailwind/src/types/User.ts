export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface UserWithRoleDTO {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  creationDate: string;
  roleId: number;
  profilePicture: string | File;
}

export type User = UserWithRoleDTO;