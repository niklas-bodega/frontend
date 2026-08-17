import RoomCard from '../../RoomsPage/components/RoomCard.tsx';
import type { Room } from '../../../types/Room.ts';
import { Link } from 'react-router-dom';
import RoomAvailabilityModal from '../../RoomsPage/components/RoomAvailabilityModal.tsx';
import { useState } from 'react';
import type { RoomType } from '../../../types/RoomType.ts';

const RoomSection = ({ rooms }: { rooms: Room[] }) => {
  const uniqueRoomsByType = Array.from(
    new Map(rooms?.map((room) => [room.roomType.type, room])).values(),
  );

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <span className="text-orange-700 font-bold tracking-[0.2em] text-xs uppercase">
            The Sanctuary
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Curated Guest Suites
          </h2>
        </div>
        <Link
          to={'/roomspage'}
          className="mt-6 md:mt-0 text-stone-500 border-b border-stone-300 pb-1 hover:text-orange-900 hover:border-orange-900 transition"
        >
          Explore All Rooms
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {selectedRoom && (
          <RoomAvailabilityModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
          />
        )}

        {uniqueRoomsByType.map((room) => (
          <RoomCard
            key={room.id}
            room={room.roomType}
            onBookNow={(room) => setSelectedRoom(room)}
          />
        ))}
      </div>
    </section>
  );
};

export default RoomSection;
