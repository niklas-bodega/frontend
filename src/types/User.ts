export interface UserInformation {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  userHasAPassword: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
  currentPassword?: string;
}
