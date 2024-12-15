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
    profilePicture: string;
    role: Role;
}

export type User = UserWithRoleDTO;