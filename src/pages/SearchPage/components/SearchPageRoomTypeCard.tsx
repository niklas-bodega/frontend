import badgeStyles from '../../RoomsPage/components/BadgeStyles.tsx';
import type { RoomType } from '../../../types/RoomType.ts';
import type { AvailableRoomsDTO } from '../../../types/AvailableRoomsDTO.ts';

const SearchPageRoomTypeCard = ({
  rooms,
  onBookNow,
}: {
  rooms: AvailableRoomsDTO[];
  onBookNow: (room: RoomType) => void;
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room.roomType.id}
          className="bg-white rounded-xl border border-stone-200 overflow-hidden"
        >
          <img
            src={room.roomType.imageUrl}
            alt={room.roomType.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span
              className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 ${badgeStyles[room.roomType.badge]}`}
            >
              {room.roomType.type}
            </span>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                  room.numberOfAvailableRooms <= 2
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {room.numberOfAvailableRooms <= 2
                  ? `Only ${room.numberOfAvailableRooms} left!`
                  : `${room.numberOfAvailableRooms} rooms available`}
              </span>
            </div>

            <h3 className="font-serif text-lg text-stone-800 mb-1">
              {room.roomType.name}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed mb-4">
              {room.roomType.description}
            </p>
            <div className="flex gap-4 text-xs text-stone-400 mb-4">
              <span>{room.roomType.size} m²</span>
              <span>Up to {room.roomType.capacity} guests</span>
              <span>WiFi</span>
              {room.roomType.extraBedAvailable && (
                <span>Extra bed available</span>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  From
                </p>
                <p className="text-xl font-bold text-orange-900">
                  €{room.roomType.price}
                  <span className="text-xs font-normal text-stone-400">
                    {' '}
                    / night
                  </span>
                </p>
              </div>
              <button
                onClick={() => onBookNow(room.roomType)}
                className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchPageRoomTypeCard;
