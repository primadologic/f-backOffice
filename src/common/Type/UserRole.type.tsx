
// export type UserRole = {
//     id: string;
//     roleName: string;
//     description: string;
//     dateCreated: string;
// }


export type UserRole = {
    dateCreated?: string;
    dateUpdated?: string;
    dateDeleted?: string | null;
    id?: string;
    roleName: string;
    description?: string;
};
  
export type UserType = {
    dateCreated?: string;
    dateUpdated?: string;
    dateDeleted?: string | null;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isActive?: boolean;
    lastLogIn?: string | null;
    lastActivity?: string | null;
    resetToken: string | null;
    refreshToken: string;
    avatarUrl?: string | null;
    accountLocked?: boolean;
    lastAssigned?: string | null;
    role: UserRole;
  };

export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: UserRole; // Optional because it's not marked as required
  avatarUrl?: File | null; // Assuming the binary data will be handled as a File
};


export type CreateUserRoleType = {
  roleName: string;
  displayName: string;
  description: string
}


