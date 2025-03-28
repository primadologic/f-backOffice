import { UserType } from "./UserRole.type";

export type UserProfileType = {
  firstNam: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleId?: string; 
  avatarUrl?: string;
};


export type UserSettingsType = {
    user: UserType
}


export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string,
  confirmPassword: string;
}


