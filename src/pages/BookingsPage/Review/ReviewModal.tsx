import { useState } from 'react';
import type { Booking } from '../../../types/Booking.ts';
import { createReview } from '../../../api/ReviewApiService.ts';
import StarRatingInput from './components/StarRatingInput.tsx';



const ReviewModal = ({
  booking,
  onClose,
  onSubmitted,
}: {
  booking: Booking;
  onClose: () => void;
  onSubmitted: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (rating < 1) {
      setError('Please select a rating.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createReview({
        rating,
        comment,
        bookingNumber: booking.bookingNumber,
        roomTypeId: booking.room.roomType.id,
        roomTypeName: booking.room.roomType.name,
      });
      onSubmitted();
      onClose();
    } catch {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="font-serif text-xl text-stone-800 mb-4">
          Leave a Review
        </h3>
        <p className="text-sm text-stone-500 mb-4">
          {booking.room.roomType.name}
        </p>

        <StarRatingInput rating={rating} onChange={setRating} />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience (optional)"
          maxLength={1000}
          rows={4}
          className="w-full border border-stone-200 rounded p-3 mt-4 text-sm"
        />

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="text-stone-500 text-sm px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
