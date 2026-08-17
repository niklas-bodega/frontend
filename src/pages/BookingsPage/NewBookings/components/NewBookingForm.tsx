import { useBookingForm } from '../../../../hooks/useBookingForm.tsx';
import type { BookingFormData } from '../../../../utils/ValidationUtils.ts';
import { nightsBetween } from '../../../../utils/BookingUtils.ts';
import type { RoomType } from '../../../../types/RoomType.ts';

const NewBookingForm = ({
  onSubmit,
  loading,
  error,
  room,
  checkInDate,
  checkOutDate,
}: {
  room: RoomType;
  onSubmit: (data: BookingFormData) => void;
  loading: boolean;
  success: boolean;
  checkInDate?: string;
  checkOutDate?: string;
  error: string | null;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useBookingForm({
    checkInDate,
    checkOutDate,
  });

  const watchCheckInDate = watch('checkInDate');
  const watchCheckOutDate = watch('checkOutDate');
  const extraBed = watch('extraBed');

  const nights = nightsBetween(watchCheckInDate, watchCheckOutDate);

  const totalPrice = nights * room.price;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-stone-200 p-7"
    >
      <h2 className="font-serif text-lg text-stone-800 mb-6">
        Your stay details
      </h2>

      <div className="mb-4">
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
          Check-in date
        </label>
        <input
          {...register('checkInDate')}
          type="date"
          className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
        />
        {errors.checkInDate && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {errors.checkInDate.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
          Check-out date
        </label>
        <input
          {...register('checkOutDate')}
          type="date"
          className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
        />
        {errors.checkOutDate && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {errors.checkOutDate.message}
          </p>
        )}
      </div>

      {room.extraBedAvailable && (
        <div className="flex items-center justify-between border border-stone-200 rounded p-3 mb-6">
          <div>
            <p className="text-sm text-stone-700">Extra bed</p>
            <p className="text-xs text-stone-400">Need an extra bed?</p>
          </div>
          <input
            {...register('extraBed')}
            type="checkbox"
            className="w-4 h-4 accent-orange-900"
          />
        </div>
      )}
      <hr className="border-stone-100 mb-4" />

      {nights > 0 && (
        <>
          <div className="flex justify-between text-sm text-stone-500 mb-2">
            <span>
              €{room.price} × {nights} nights
            </span>
            <span>€{nights * room.price}</span>
          </div>
          {extraBed && (
            <div className="flex justify-between text-sm text-stone-500 mb-2">
              <span>Extra bed</span>
            </div>
          )}
          <hr className="border-stone-100 my-3" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-stone-700">
              Total
            </span>
            <span className="font-serif text-2xl text-orange-900 font-bold">
              €{totalPrice}
            </span>
          </div>
        </>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </form>
  );
};

export default NewBookingForm;
