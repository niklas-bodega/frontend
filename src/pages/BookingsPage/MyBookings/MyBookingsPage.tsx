import BookingPageMainComponent from './components/BookingPageMainComponent.tsx';
import { useEffect, useState } from 'react';
import {
  deleteBooking,
  getAllBookings,
} from '../../../api/BookingApiService.ts';
import type { Booking } from '../../../types/Booking.ts';
import LoadingMessage from '../../../components/LoadingMessage.tsx';
import ErrorMessage from '../../../components/ErrorMessage.tsx';
import CancelBookingConfirmationModal from './components/CancelBookingConfirmationModal.tsx';
import EditBookingModal from '../EditBooking/EditBookingModal.tsx';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chosenBookingNumber, setChosenBookingNumber] = useState<string | null>(
    null,
  );
  const [chosenEditBooking, setChosenEditBooking] = useState<Booking | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEdit = (booking: Booking) => {
    setChosenEditBooking(booking);
  };

  const handleCancel = (bookingNumber: string) => {
    setChosenBookingNumber(bookingNumber);
  };

  const refreshBookings = async () => {
    try {
      const myBookings = await getAllBookings();
      setBookings(myBookings);
      setLoading(false);
    } catch {
      setError('Failed to refresh bookings');
    } finally {
      setLoading(false);
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (a.status === 'CANCELLED' && b.status !== 'CANCELLED') return 1;
    if (a.status !== 'CANCELLED' && b.status === 'CANCELLED') return -1;

    return (
      new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
    );
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const myBookings = await getAllBookings();
        setBookings(myBookings);
      } catch {
        setError('Failed loading bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <LoadingMessage message={'Loading bookings...'} />;

  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }
  return (
    <>
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm text-center py-3 rounded-lg mb-6">
          ✓ {successMessage}
        </div>
      )}

      {chosenEditBooking && (
        <EditBookingModal
          booking={chosenEditBooking}
          onClose={() => setChosenEditBooking(null)}
          onSuccess={() => {
            setSuccessMessage('Booking changed successfully!');
            setChosenEditBooking(null);
            setTimeout(() => setSuccessMessage(null), 4000);
            refreshBookings();
          }}
        />
      )}

      {chosenBookingNumber && (
        <CancelBookingConfirmationModal
          bookingNumber={chosenBookingNumber}
          onConfirm={async () => {
            try {
              await deleteBooking(chosenBookingNumber);
            } catch {
              setError('Failed to delete booking.');
              setChosenBookingNumber(null);
              return;
            }
            setChosenBookingNumber(null);
            refreshBookings();
          }}
          onCancel={() => setChosenBookingNumber(null)}
        />
      )}

      <BookingPageMainComponent
        bookings={sortedBookings}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default MyBookingsPage;
