import type { Booking } from '../types/Booking.ts';

export const statusStyles: Record<Booking['status'], string> = {
  CONFIRMED: 'bg-green-100 text-green-800',
  AWAITING_CONFIRMATION: 'bg-yellow-100 text-yellow-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export const statusLabels: Record<Booking['status'], string> = {
  CONFIRMED: 'Confirmed',
  AWAITING_CONFIRMATION: 'Awaiting Confirmation',
  CANCELLED: 'Cancelled',
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const nightsBetween = (checkIn: string, checkOut: string) => {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

export const isExpired = (checkOutDate: string) : boolean => {
  return new Date(checkOutDate) < new Date();
}