import Navbar from '../../components/Navbar.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage.tsx';
import { getAllAvailableRooms } from '../../api/RoomApiService.ts';
import LoadingMessage from '../../components/LoadingMessage.tsx';
import type { RoomType } from '../../types/RoomType.ts';
import SearchSummaryBar from './components/SearchSummaryBar.tsx';
import SearchPageRoomTypeCard from './components/SearchPageRoomTypeCard.tsx';
import NoAvailableRooms from './components/NoAvailableRooms.tsx';
import ResultsHeader from './components/ResultsHeader.tsx';
import { useAuth } from '../../hooks/useAuth.tsx';
import type { AvailableRoomsDTO } from '../../types/AvailableRoomsDTO.ts';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';
  const nrOfGuests = Number(searchParams.get('nrOfGuests') ?? 1);
  const adults = Number(searchParams.get('adults') ?? 1);
  const children = Number(searchParams.get('children') ?? 0);

  const [rooms, setRooms] = useState<AvailableRoomsDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllAvailableRooms(
          checkInDate,
          checkOutDate,
          nrOfGuests,
        );
        setRooms(data);
      } catch {
        setError('Failed to load available rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [checkInDate, checkOutDate, nrOfGuests]);

  const handleBookNow = (room: RoomType) => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { redirectTo: '/newBooking', room, checkInDate, checkOutDate },
      });
      return;
    }
    navigate('/newBooking', { state: { room, checkInDate, checkOutDate } });
  };

  if (loading) return <LoadingMessage message="Searching available rooms..." />;
  if (error)
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <SearchSummaryBar
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        adults={adults}
        children={children}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <ResultsHeader rooms={rooms} />
        {rooms.length === 0 ? (
          <NoAvailableRooms
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            adults={adults}
            children={children}
          />
        ) : (
          <SearchPageRoomTypeCard rooms={rooms} onBookNow={handleBookNow} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
