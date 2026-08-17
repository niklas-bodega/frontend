export interface BookingRequestDto {
  roomTypeId: number;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
}

export interface UpdateBookingRequestDto {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
}
