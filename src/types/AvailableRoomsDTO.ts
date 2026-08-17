import type { RoomType } from './RoomType.ts';

export interface AvailableRoomsDTO {
  roomType: RoomType;
  numberOfAvailableRooms: number;
}
