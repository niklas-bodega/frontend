import Navbar from '../../../components/Navbar.tsx';
import RoomCard from './RoomCard.tsx';
import FeaturedRoom from './FeaturedRoom.tsx';
import type { Room } from '../../../types/Room.ts';
import RoomPageHeader from './RoomPageHeader.tsx';
import { useState } from 'react';
import type { RoomType } from '../../../types/RoomType.ts';
import RoomAvailabilityModal from './RoomAvailabilityModal.tsx';
import { useRatingsByRoomType } from '../../../hooks/useRatingsByRoomType.tsx';

const RoomsPageMainComponent = ({ rooms }: { rooms: Room[] }) => {
  const featuredRoom = rooms.find((r) => r.roomType.featured);
  const regularRooms = rooms.filter((r) => !r.roomType.featured);
  const ratingByRoomsType = useRatingsByRoomType();

  const uniqueRoomsByType = Array.from(
    new Map(regularRooms?.map((room) => [room.roomType.type, room])).values(),
  );

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <RoomPageHeader />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
          Accommodations
        </p>
        <h2 className="font-serif text-3xl text-stone-800 mb-1">
          Find your perfect room
        </h2>
        <p className="text-sm text-stone-500 mb-10">
          All rooms include breakfast, WiFi, and access to our pool and spa.
        </p>

        <div className="flex flex-col gap-6">
          {selectedRoom && (
            <RoomAvailabilityModal
              room={selectedRoom}
              onClose={() => setSelectedRoom(null)}
            />
          )}
          {featuredRoom && (
            <FeaturedRoom
              room={featuredRoom.roomType}
              rating={ratingByRoomsType[featuredRoom.roomType.id]}
              onBookNow={setSelectedRoom}
            />
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {uniqueRoomsByType.map((room) => (
              <RoomCard
                key={room.id}
                room={room.roomType}
                rating={ratingByRoomsType[room.roomType.id]}
                onBookNow={(room) => setSelectedRoom(room)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomsPageMainComponent;
