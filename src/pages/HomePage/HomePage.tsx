import Navbar from '../../components/Navbar.tsx';
import HomePageHero from './components/HomePageHero.tsx';
import Footer from './components/Footer.tsx';
import RoomSection from './components/RoomSection.tsx';
import { useEffect, useState } from 'react';
import type { Room } from '../../types/Room.ts';
import { getAllRooms } from '../../api/RoomApiService.ts';
import { useRatingsByRoomType } from '../../hooks/useRatingsByRoomType.tsx';

const Homepage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const ratingByRoomType = useRatingsByRoomType();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await getAllRooms();
        setRooms(allRooms);
      } catch {
        setError('Failed loading rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <HomePageHero />
      {!loading && !error && <RoomSection rooms={rooms} ratingsByRoomType={ratingByRoomType} />}
      <Footer />
    </div>
  );
};

export default Homepage;
