import badgeStyles from './BadgeStyles.tsx';
import type { RoomType } from '../../../types/RoomType.ts';

const RoomCard = ({
  room,
  onBookNow,
}: {
  room: RoomType;
  onBookNow: (room: RoomType) => void;
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <img
        src={room.imageUrl}
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <span
          className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 ${badgeStyles[room.badge]}`}
        >
          {room.type}
        </span>
        <h3 className="font-serif text-lg text-stone-800 mb-1">{room.name}</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          {room.description}
        </p>
        <div className="flex gap-4 text-xs text-stone-500 mb-4">
          <span>{room.size} m²</span>
          <span>Up to {room.capacity} guests</span>
          <span>WiFi included</span>
          {room.extraBedAvailable && <span>Extra bed available</span>}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400">
              From
            </p>
            <p className="text-xl font-bold text-orange-900">
              €{room.price}{' '}
              <span className="text-xs font-normal text-stone-400">
                / night
              </span>
            </p>
          </div>
          <button
            onClick={() => onBookNow(room)}
            className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
