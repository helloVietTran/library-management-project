import { User } from "@/interfaces/commom";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dob: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}
