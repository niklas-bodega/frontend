import type { RoomType } from './RoomType.ts';

export interface Room {
  id: number;
  roomNumber: number;
  extraBed: boolean;
  roomType: RoomType;
}
