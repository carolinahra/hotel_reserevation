export interface RoomTuple {
  id: number;
  room_size_id: number;
  name: string;
  price: number;
  availability: string;
  created_at: string;
  updated_at: string;
}

export interface RoomTable {
  Room: RoomTuple;
}
