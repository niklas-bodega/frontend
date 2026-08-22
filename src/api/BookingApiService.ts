import { bookingAxios } from './AxiosConfig.ts';
import type {
  BookingRequestDto,
  UpdateBookingRequestDto,
} from '../pages/BookingsPage/NewBookings/dto/BookingRequestDto.ts';

export const getAllBookings = async () => {
  try {
    const response = await bookingAxios.get('/api/bookings/my');
    return response.data;
  } catch (error) {
    console.error('Error getting all user bookings', error);
    throw error;
  }
};

export const editBooking = async (
  bookingNumber: string,
  updatedBooking: UpdateBookingRequestDto,
) => {
  try {
    const response = await bookingAxios.put(
      `/api/bookings/${bookingNumber}`,
      updatedBooking,
    );
    return response.data;
  } catch (error) {
    console.error('Error getting bookings', error);
    throw error;
  }
};

export const createBooking = async (newBooking: BookingRequestDto) => {
  try {
    const response = await bookingAxios.post('/api/bookings', newBooking);
    return response.data;
  } catch (error) {
    console.error('Error creating new booking', error);
    throw error;
  }
};

export const deleteBooking = async (bookingNumber: string) => {
  try {
    const response = await bookingAxios.delete(
      `/api/bookings/${bookingNumber}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting booking', error);
    throw error;
  }
};
