import badgeStyles from './BadgeStyles.tsx';
import type { RoomType } from '../../../types/RoomType.ts';
import StarRating from '../../../components/StarRatingProps.tsx';

const FeaturedRoom = ({
  room,
  rating,
  onBookNow,
}: {
  room: RoomType;
  rating: number;
  onBookNow: (room: RoomType) => void;
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden grid md:grid-cols-2">
      <img
        src={room.imageUrl}
        alt={room.name}
        className="w-full h-full min-h-[280px] object-cover"
      />
      <div className="p-8 flex flex-col justify-center">
        <span
          className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${badgeStyles[room.badge]}`}
        >
          {room.type}
        </span>
        <h3 className="font-serif text-2xl text-stone-800 mb-2">{room.name}</h3>
        {rating !== undefined ? (
          <StarRating rating={rating} />
        ) : (
          <span className="text-sm text-stone-400">No reviews yet</span>
        )}
        <p className="text-sm text-stone-500 leading-relaxed mb-6">
          {room.description}
        </p>
        <div className="flex gap-4 text-xs text-stone-500 mb-6">
          <span>{room.size} m²</span>
          <span>Up to {room.capacity} guests</span>
          <span>Private terrace</span>
          <span>WiFi included</span>
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
export default FeaturedRoom;
