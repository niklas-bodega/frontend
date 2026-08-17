import { formatDate, nightsBetween } from '../../../utils/BookingUtils.ts';
import { useNavigate } from 'react-router-dom';

const SearchSummaryBar = ({
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
  const nights = nightsBetween(checkInDate, checkOutDate);

  return (
    <div className="bg-white border-b border-stone-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
          <span>📅</span>
          {formatDate(checkInDate)}
        </div>
        <span className="text-stone-400 text-sm">→</span>
        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
          {formatDate(checkOutDate)}
        </div>
        <div className="w-px h-5 bg-stone-200" />
        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
          {adults} {adults === 1 ? 'Adult' : 'Adults'} · {children}{' '}
          {children === 1 ? 'Child' : 'Children'}
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 text-sm text-yellow-800">
          {nights} nights
        </div>
        <button
          onClick={() =>
            navigate('/', {
              state: { checkInDate, checkOutDate, adults, children },
            })
          }
          className="ml-auto border border-orange-900 text-orange-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
        >
          Edit search
        </button>
      </div>
    </div>
  );
};

export default SearchSummaryBar;
