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
<<<<<<< HEAD
  roleId: number;
  profilePicture: string | File;
=======
  role: Role;
}


export interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  roleId: string;
>>>>>>> cbe57c1c6aee6cfa7b812827196fdb98638641a8
}

