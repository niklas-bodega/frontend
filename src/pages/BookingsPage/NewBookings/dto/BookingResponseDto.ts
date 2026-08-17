import type { Room } from '../../../../types/Room.ts';

export interface BookingResponseDto {
  bookingNumber: number;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
  status: 'ACTIVE' | 'CONFIRMED' | 'AWAITING_CONFIRMATION' | 'CANCELLED';
}
