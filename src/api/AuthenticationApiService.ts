import axiosInstance from './AxiosConfig.ts';

export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axiosInstance.post('/api/user/register', {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.get('/api/auth/logout');
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};

export const logoutAllDevices = async () => {
  try {
    await axiosInstance.get('/api/auth/logout-all-devices');
  } catch (error) {
    console.error('Error logging out all devices', error);
    throw error;
  }
};
