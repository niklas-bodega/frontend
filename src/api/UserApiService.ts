import axiosInstance from './AxiosConfig.ts';
import type { UpdateUserRequest, UserInformation } from '../types/User.ts';

export const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get<UserInformation>('/api/user');
  return response.data;
};

export const updateUserInformation = async (
  updatedUser: UpdateUserRequest,
): Promise<void> => {
  await axiosInstance.patch('/api/user', updatedUser);
};

export const deleteUserAccount = async (): Promise<void> => {
  await axiosInstance.delete('/api/user');
};
