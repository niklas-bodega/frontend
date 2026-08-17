export interface RoomType {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  size: number;
  capacity: number;
  badge: 'STANDARD' | 'PREMIUM' | 'SUITE';
  featured?: boolean;
  imageUrl: string;
  extraBedAvailable: boolean;
}
