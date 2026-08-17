import { useNavigate } from 'react-router-dom';

const NoAvailableRooms = ({
  checkInDate,
  checkOutDate,
  adults,
  children,
}: {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-20 text-center">
      <p className="font-serif text-2xl text-stone-700 mb-2">
        No rooms available
      </p>
      <p className="text-sm text-stone-400 mb-6">
        Try different dates or fewer guests.
      </p>
      <button
        onClick={() =>
          navigate('/', {
            state: { checkInDate, checkOutDate, adults, children },
          })
        }
        className="bg-orange-900 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
      >
        Search again
      </button>
    </div>
  );
};
export default NoAvailableRooms;
