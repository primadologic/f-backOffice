export type UserProfileType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleId?: string; 
  avatarUrl?: string;
};


export type UserSettingsType = {
    user: UserProfileType
}
