import { Room } from "../models/room";
import { DeleteRoomRequestDTO } from "../requests/room/delete-room.request.dto";
import { GetRoomRequestDTO } from "../requests/room/get-room.request.dto";
import { InsertRoomRequestDTO } from "../requests/room/insert-room.request.dto";
import { UpdateRoomRequestDTO } from "../requests/room/update-room.request.dto";
import { RoomService } from "../services/room.service";

export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  public get(request: GetRoomRequestDTO): Promise<Room | Room[]> {
    return this.roomService.get(request);
  }
  public update(request: UpdateRoomRequestDTO): Promise<Room> {
    return this.roomService.update(request);
  }
  public insert(request: InsertRoomRequestDTO): Promise<Room> {
    return this.roomService.insert(request);
  }
  public delete(request: DeleteRoomRequestDTO): Promise<boolean> {
    return this.roomService.delete(request);
  }
}
