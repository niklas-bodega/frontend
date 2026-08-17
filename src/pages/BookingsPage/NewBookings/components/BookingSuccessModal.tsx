import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../utils/BookingUtils.ts';
import type { BookingResponseDto } from '../dto/BookingResponseDto.ts';

const BookingSuccessModal = ({ booking }: { booking: BookingResponseDto }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl border border-stone-100 p-10 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="font-serif text-2xl text-stone-800 mb-2">
          Booking confirmed!
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-6">
          Your reservation at Niklas Bodega has been received. We look forward
          to welcoming you.
        </p>

        <div className="bg-stone-50 rounded-xl p-5 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-400">Room</span>
            <span className="text-stone-700 font-medium">
              {booking.room.roomType.name}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-400">Check-in</span>
            <span className="text-stone-700 font-medium">
              {formatDate(booking.checkInDate)}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-400">Check-out</span>
            <span className="text-stone-700 font-medium">
              {formatDate(booking.checkOutDate)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-400">Extra bed</span>
            <span className="text-stone-700 font-medium">
              {booking.extraBed ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <div className="h-1 bg-stone-100 rounded-full mb-3 overflow-hidden">
          <div className="h-1 bg-orange-900 rounded-full animate-[shrink_4s_linear_forwards]" />
        </div>
        <style>{`
          @keyframes shrink {
              from { width: 100%; }
              to { width: 0%; }
          }
        `}</style>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">
          Redirecting to your bookings...
        </p>

        <button
          onClick={() => navigate('/myBookings')}
          className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
        >
          View my bookings now
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
