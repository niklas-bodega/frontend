import type { AvailableRoomsDTO } from '../../../types/AvailableRoomsDTO.ts';

const ResultsHeader = ({ rooms }: { rooms: AvailableRoomsDTO[] }) => {
  return (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
        Available rooms
      </p>
      <h1 className="font-serif text-4xl text-stone-800 mb-1">
        {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} available
      </h1>
      <p className="text-sm text-stone-500">
        Showing rooms available for your selected dates and guests.
      </p>
    </div>
  );
};
export default ResultsHeader;
