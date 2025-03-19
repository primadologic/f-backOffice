

// types/user.type.ts

import { UserRole } from "./UserRole.type";


interface UserType {
  id: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  role: string;
  lastLogin?: string;
  accessToken?: string;
  refreshToken?: string;
}

export type UserDetailType = {
  userId: any;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role?: UserRole
  isActive?: string;
  lastLogin?: Date;
}

type JwtDecodedType = {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role?: string;
  lastLogin: Date;
  iat: number; // Use number for iat and exp since they represent timestamps
  exp: number; // Use number for iat and exp since they represent timestamps
};

type CredentialsType = {
  email: string;
  password: string;
};

type UserLoginResponseType = {
  data?:
    | {
        accessToken?: string;
        refreshToken?: string;
      }
    | undefined;
  statusCode?: number;
  message?: string;
  error?: string;
};

export type {
  UserType,
  JwtDecodedType,
  CredentialsType,
  UserLoginResponseType,
};
