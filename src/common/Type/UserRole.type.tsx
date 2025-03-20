
// export type UserRole = {
//     id: string;
//     roleName: string;
//     description: string;
//     dateCreated: string;
// }


type UserRole = {
    dateCreated: string;
    dateUpdated: string;
    dateDeleted: string | null;
    id: string;
    roleName: string;
    description: string;
  };
  
export type UserType = {
    dateCreated?: string;
    dateUpdated?: string;
    dateDeleted?: string | null;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
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
  