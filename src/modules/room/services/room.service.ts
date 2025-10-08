import { Room } from "../models/room";
import { RoomRepository } from "../repositories/room.repository";

interface GetRoom {
  id?: number;
  name?: string;
  size?: string;
  limit?: number;
  offset?: number;
}
interface UpdateRoom {
  name: string;
  availability?: string;
  price?: number;
}
interface InsertRoom {
  name: string;
  sizeId: number;
  price: number;
  availability: string;
}
interface DeleteRoom {
  name: string;
}

export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public get(getRoom: GetRoom): Promise<Room | Room[]> {
    return this.roomRepository.get(getRoom);
  }
  public update(updateRoom: UpdateRoom): Promise<Room> {
    return this.roomRepository.update(updateRoom);
  }
  public insert(insertRoom: InsertRoom): Promise<Room> {
    return this.roomRepository.insert(insertRoom);
  }
   public delete(deleteRoom: DeleteRoom): Promise<boolean> {
    return this.roomRepository.delete(deleteRoom);
  }
}
