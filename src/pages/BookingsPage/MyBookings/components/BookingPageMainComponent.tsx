import Navbar from '../../../../components/Navbar.tsx';
import type { Booking } from '../../../../types/Booking.ts';
import BookingCard from './BookingCard.tsx';
import { Link } from 'react-router-dom';

const BookingPageMainComponent = ({
  bookings,
  handleEdit,
  handleCancel,
}: {
  bookings: Booking[];
  handleEdit: (booking: Booking) => void;
  handleCancel: (bookingNumber: string) => void;
}) => {
  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
              Account
            </p>
            <h1 className="font-serif text-4xl text-stone-800">My Bookings</h1>
          </div>
          <Link
            to={'/roomspage'}
            className="bg-orange-900 text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
          >
            + New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
            <p className="font-serif text-xl text-stone-700 mb-2">
              No bookings yet
            </p>
            <p className="text-sm text-stone-400">
              Your reservations will appear here once you make a booking.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.bookingNumber}
                booking={booking}
                onEdit={handleEdit}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPageMainComponent;
