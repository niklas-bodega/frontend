import type { Booking } from '../../../types/Booking.ts';
import {
  calculatedMinCheckOutDate,
  minCheckInDate,
  toDateInputFormat,
  tomorrow,
} from '../../RoomsPage/utils/CurrentDateUtils.ts';
import { useMemo, useState } from 'react';
import { checkIfRoomTypeAvailable } from '../../../api/RoomApiService.ts';
import { editBooking } from '../../../api/BookingApiService.ts';

const EditBookingModal = ({
  booking,
  onClose,
  onSuccess,
}: {
  booking: Booking;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [checkInDate, setCheckInDate] = useState(
    toDateInputFormat(booking.checkInDate),
  );
  const [checkOutDate, setCheckOutDate] = useState(
    toDateInputFormat(booking.checkOutDate),
  );
  const [extraBed, setExtraBed] = useState(booking.extraBed);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const minCheckOutDate = useMemo(() => {
    if (checkInDate) {
      return calculatedMinCheckOutDate(checkInDate);
    }
    return tomorrow;
  }, [checkInDate]);

  const handleCheckAvailability = async () => {
    try {
      setLoading(true);
      const isAvailable = await checkIfRoomTypeAvailable(
        booking.room.roomType.id,
        checkInDate,
        checkOutDate,
        booking.bookingNumber,
      );
      setAvailable(isAvailable);
      if (!isAvailable) {
        setError('Room not available for those dates.');
      }
    } catch {
      setError('Failed to check availability.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await editBooking(booking.bookingNumber, {
        roomId: booking.room.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        extraBed: extraBed,
      });
      onSuccess();
      onClose();
    } catch {
      setError("Couldn't update booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl border border-stone-100 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl text-stone-800">Edit Booking</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              #{booking.bookingNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                min={minCheckInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  setAvailable(null);
                  setError(null);
                }}
                className="w-full border border-stone-200 p-2.5 rounded text-sm outline-none focus:ring-1 focus:ring-orange-900"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                min={minCheckOutDate}
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                  setAvailable(null);
                  setError(null);
                }}
                className="w-full border border-stone-200 p-2.5 rounded text-sm outline-none focus:ring-1 focus:ring-orange-900"
              />
            </div>
          </div>

          {booking.room.roomType.extraBedAvailable && (
            <div className="flex items-center justify-between border border-stone-200 rounded p-3 mb-5">
              <div>
                <p className="text-sm text-stone-700">Extra bed</p>
                <p className="text-xs text-stone-400">
                  Add an extra bed to your room
                </p>
              </div>
              <input
                type="checkbox"
                checked={extraBed}
                onChange={(e) => setExtraBed(e.target.checked)}
                className="w-4 h-4 accent-orange-900"
              />
            </div>
          )}

          {error && (
            <p className="bg-red-50 text-red-700 text-sm text-center py-2 rounded mb-4">
              {error}
            </p>
          )}

          {available && (
            <p className="bg-green-50 text-green-700 text-sm text-center py-2 rounded mb-4 flex items-center justify-center gap-2">
              <span>✓</span> Room is available for selected dates!
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-stone-200 text-stone-700 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            {available ? (
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-2 bg-green-700 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-green-800 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Confirm Changes'}
              </button>
            ) : (
              <button
                onClick={handleCheckAvailability}
                disabled={loading}
                className="flex-2 bg-orange-900 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check Availability'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
