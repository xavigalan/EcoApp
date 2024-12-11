export interface Role {
    id: number;
    name: string;
    description: string;
  }
  
  export interface UserWithRoleDTO {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    creationDate: string;
    role: Role;
  }
  