import type { Room } from './Room.ts';

export interface Booking {
  bookingNumber: string;
  room: Room;
  roomImageUrl: string;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
  status: 'CONFIRMED' | 'AWAITING_CONFIRMATION' | 'CANCELLED';
}
