import type { RoomType } from '../../../types/RoomType.ts';
import badgeStyles from './BadgeStyles.tsx';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { getAllAvailableRooms } from '../../../api/RoomApiService.ts';
import type { AvailableRoomsDTO } from '../../../types/AvailableRoomsDTO.ts';
import {
  calculatedMinCheckOutDate,
  minCheckInDate,
  tomorrow,
} from '../utils/CurrentDateUtils.ts';

const AvailabilityModal = ({
  room,
  onClose,
}: {
  room: RoomType;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [available, setAvailable] = useState<boolean | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const adultOptions = Array.from({ length: 4 }, (_, i) => i + 1);
  const childrenOptions = Array.from({ length: 5 }, (_, i) => i);
  const totalGuests = adults + children;
  const [checkInDate, setCheckInDate] = useState<string>(minCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  const minCheckOutDate = useMemo(() => {
    if (checkInDate) {
      return calculatedMinCheckOutDate(checkInDate);
    }
    return tomorrow;
  }, [checkInDate]);

  const handleCheckAvailability = async () => {
    setLoading(true);
    try {
      if (!checkInDate || !checkOutDate) {
        setError('Please select both dates.');
        return;
      }

      if (room.capacity < totalGuests) {
        setError('Too many people for this room.');
        return;
      }

      const rooms = await getAllAvailableRooms(
        checkInDate,
        checkOutDate,
        totalGuests,
      );

      const isAvailable = rooms.some(
        (r: AvailableRoomsDTO) => r.roomType.id === room.id,
      );
      setAvailable(isAvailable);
      if (!isAvailable) {
        setError('Room not available for selected dates, please try again.');
      }
    } catch {
      setError('Failed to check availability');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate('/newBooking', {
      state: {
        room,
        checkInDate,
        checkOutDate,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl border border-stone-100 w-full max-w-md overflow-hidden">
        <div className="relative h-40">
          <img
            src={room.imageUrl}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
            <span
              className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-2 w-fit ${badgeStyles[room.badge]}`}
            >
              {room.type}
            </span>
            <h3 className="font-serif text-lg text-white mb-1">{room.name}</h3>
            <p className="text-xs text-white/80">
              €{room.price} / night · Up to {room.capacity} guests
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Check-in
              </label>
              <input
                type="date"
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

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Adults
              </label>
              <select
                value={adults}
                onChange={(e) => {
                  setAdults(Number(e.target.value));
                  setAvailable(null);
                }}
                className="w-full border border-stone-200 p-2.5 rounded text-sm bg-white outline-none focus:ring-1 focus:ring-orange-900"
              >
                {adultOptions.map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Children
              </label>
              <select
                value={children}
                onChange={(e) => {
                  setChildren(Number(e.target.value));
                  setAvailable(null);
                }}
                className="w-full border border-stone-200 p-2.5 rounded text-sm bg-white outline-none focus:ring-1 focus:ring-orange-900"
              >
                {childrenOptions.map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="bg-red-50 text-red-700 text-sm text-center py-2 rounded mb-4">
              {error}
            </p>
          )}

          {available && !isAuthenticated && (
            <div className="bg-stone-50 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-stone-500 mb-3">
                Please sign in to complete your booking.
              </p>
              <button
                onClick={() => handleBookNow()}
                className="w-full bg-orange-900 text-white py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
              >
                Sign in to book
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-stone-200 text-stone-700 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            {available && isAuthenticated ? (
              <button
                onClick={handleBookNow}
                className="flex-2 bg-green-700 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-green-800 transition"
              >
                Book Now ✓
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
export default AvailabilityModal;
