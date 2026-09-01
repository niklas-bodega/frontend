import type { Booking } from '../../../../types/Booking.ts';
import {
  formatDate,
  isExpired,
  nightsBetween,
  statusLabels,
  statusStyles,
} from '../../../../utils/BookingUtils.ts';

const BookingCard = ({
  booking,
  onEdit,
  onCancel,
  onLeaveReview,
}: {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onCancel: (bookingNumber: string) => void;
  onLeaveReview: (booking: Booking) => void;
}) => {
  const isCancelled = booking.status === 'CANCELLED';
  const isBookingExpired = !isCancelled && isExpired(booking.checkOutDate);
  const nights = nightsBetween(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 flex gap-5 items-start">
      <img
        src={booking.room.roomType.imageUrl}
        alt={booking.room.roomType.name}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-stone-800 mb-3">
          {booking.room.roomType.name}
        </h3>

        <div className="flex gap-6 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Check-in
            </p>
            <p className="text-sm font-medium text-stone-700">
              {formatDate(booking.checkInDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Check-out
            </p>
            <p className="text-sm font-medium text-stone-700">
              {formatDate(booking.checkOutDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Duration
            </p>
            <p className="text-sm font-medium text-stone-700">
              {nights} nights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${statusStyles[booking.status]}`}
          >
            {statusLabels[booking.status]}
          </span>
          {booking.extraBed && (
            <span className="text-xs text-stone-400">Extra bed included</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(booking)}
          disabled={isCancelled || isBookingExpired}
          className="border border-orange-900 text-orange-900 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Edit
        </button>
        <button
          onClick={() => onCancel(booking.bookingNumber)}
          disabled={isCancelled || isBookingExpired}
          className="border border-red-700 text-red-700 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        {isBookingExpired && (
          <button
            onClick={() => onLeaveReview(booking)}
            className="border border-stone-400 text-stone-600 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
          >
            Leave Review
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
