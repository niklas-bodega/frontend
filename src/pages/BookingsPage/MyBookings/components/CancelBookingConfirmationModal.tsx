const CancelBookingConfirmationModal = ({
  bookingNumber,
  onConfirm,
  onCancel,
}: {
  bookingNumber: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl border border-stone-100 p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-6 h-6 text-red-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h2 className="font-serif text-2xl text-stone-800 mb-2">
          Cancel booking?
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-5">
          This action cannot be undone. Your reservation will be permanently
          cancelled.
        </p>

        <div className="bg-stone-50 rounded-lg px-4 py-3 mb-6 text-sm text-stone-500">
          Booking reference:{' '}
          <span className="text-stone-700 font-medium">#{bookingNumber}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-stone-200 text-stone-700 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
          >
            Keep booking
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-700 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition"
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default CancelBookingConfirmationModal;
