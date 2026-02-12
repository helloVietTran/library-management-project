export interface UpdateUserStatusData {
  userId: string;
  status: 'active' | 'banned';
}

export interface CreateUserRequest{
  fullName: string;
  email: string;
  dob: string;
}