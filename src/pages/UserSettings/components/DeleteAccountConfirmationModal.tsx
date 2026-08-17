import { useState, type FormEvent } from 'react';

const CONFIRMATION_TEXT = 'em eteled';

interface DeleteAccountConfirmationModalProps {
  isDeleting: boolean;
  isDeleted: boolean;
  countdown: number;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteAccountConfirmationModal = ({
  isDeleting,
  isDeleted,
  countdown,
  error,
  onConfirm,
  onCancel,
}: DeleteAccountConfirmationModalProps) => {
  const [confirmation, setConfirmation] = useState('');
  const confirmationMatches = confirmation.trim() === CONFIRMATION_TEXT;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!confirmationMatches || isDeleting || isDeleted) {
      return;
    }

    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        className="bg-white border border-stone-100 rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-stone-950 px-8 py-6 text-white">
          <p className="text-[10px] uppercase tracking-widest text-orange-200 font-bold mb-2">
            Danger zone
          </p>
          <h2 id="delete-account-title" className="font-serif text-2xl">
            {isDeleted ? 'Account removed' : 'Remove account?'}
          </h2>
        </div>

        {isDeleted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl font-serif text-green-800">
                {countdown}
              </span>
            </div>
            <p className="text-stone-800 font-medium mb-2">
              Your account has been deleted.
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              Redirecting to the login page in {countdown} seconds.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              This permanently deletes your account and cannot be undone. To
              continue, type{' '}
              <span className="font-mono text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">
                {CONFIRMATION_TEXT}
              </span>
              .
            </p>

            <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1 ml-1">
              Confirmation
            </label>
            <input
              autoFocus
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              placeholder="Write delete me backwards"
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-red-800 outline-none text-sm"
              disabled={isDeleting}
            />

            {error && (
              <p className="text-red-600 text-sm mt-3 bg-red-50 py-2 px-3 rounded">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                className="flex-1 border border-stone-200 text-stone-700 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keep account
              </button>
              <button
                type="submit"
                disabled={!confirmationMatches || isDeleting}
                className="flex-1 bg-red-700 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountConfirmationModal;
