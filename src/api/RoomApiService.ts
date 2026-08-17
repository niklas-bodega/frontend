//TODO calls regarding rooms

import axiosInstance from './AxiosConfig.ts';
import type { AvailableRoomsDTO } from '../types/AvailableRoomsDTO.ts';

export const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get('/api/rooms');
    return response.data;
  } catch (error) {
    console.error('Error getting all rooms', error);
    throw error;
  }
};

export const checkIfRoomTypeAvailable = async (
  roomTypeId: number,
  checkInDate: string,
  checkOutDate: string,
  bookingNumber: string,
): Promise<boolean> => {
  const response = await axiosInstance.get(
    `/api/rooms/roomTypes/available/${roomTypeId}`,
    {
      params: { checkInDate, checkOutDate, bookingNumber },
    },
  );
  return response.data;
};

export const getAllAvailableRooms = async (
  checkInDate: string,
  checkOutDate: string,
  nrOfGuests: number,
): Promise<AvailableRoomsDTO[]> => {
  try {
    const response = await axiosInstance.get('/api/rooms/roomTypes/available', {
      params: { checkInDate, checkOutDate, nrOfGuests },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting available rooms', error);
    throw error;
  }
};
