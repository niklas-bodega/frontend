import type { Room } from '../../types/Room.ts';
import { useEffect, useState } from 'react';
import { getAllAvailableRooms, getAllRooms } from '../../api/RoomApiService.ts';
import LoadingMessage from '../../components/LoadingMessage.tsx';
import ErrorMessage from '../../components/ErrorMessage.tsx';
import RoomsPageMainComponent from './components/RoomsPageMainComponent.tsx';
import { useSearchParams } from 'react-router-dom';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const nrOfGuests = searchParams.get('totalGuests');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms =
          checkInDate && checkOutDate
            ? await getAllAvailableRooms(
                checkInDate,
                checkOutDate,
                Number(nrOfGuests),
              )
            : await getAllRooms();
        console.log(allRooms);
        setRooms(allRooms);
      } catch {
        setError('Failed loading rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [checkInDate, checkOutDate, nrOfGuests]);

  if (loading) return <LoadingMessage message={'Loading rooms...'} />;

  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }
  return <RoomsPageMainComponent rooms={rooms} />;
};
export default RoomsPage;
