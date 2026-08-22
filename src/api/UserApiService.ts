import {userAxios} from './AxiosConfig.ts';
import type { UpdateUserRequest, UserInformation } from '../types/User.ts';

export const getUserInformation = async (): Promise<UserInformation> => {
  const response = await userAxios.get<UserInformation>('/api/user');
  return response.data;
};

export const updateUserInformation = async (
  updatedUser: UpdateUserRequest,
): Promise<void> => {
  await userAxios.patch('/api/user', updatedUser);
};

export const deleteUserAccount = async (): Promise<void> => {
  await userAxios.delete('/api/user');
};
