import { RoomSize } from "../models/room-size";
import { DeleteRoomSizeRequestDTO } from "../requests/room-size/delete-room-size.request.dto";
import { GetRoomSizeRequestDTO } from "../requests/room-size/get-room-size.request.dto";
import { InsertRoomSizeRequestDTO } from "../requests/room-size/insert-room-size.request.dto";
import { UpdateRoomSizeRequestDTO } from "../requests/room-size/update-room-size.request.dto";
import { RoomSizeService } from "../services/room-size.service";

export class RoomSizeController {
  constructor(private readonly roomSizeService: RoomSizeService) {}

  public get(request: GetRoomSizeRequestDTO): Promise<RoomSize | RoomSize[]> {
    return this.roomSizeService.get(request);
  }
  public update(request: UpdateRoomSizeRequestDTO): Promise<RoomSize> {
    return this.roomSizeService.update(request);
  }
  public insert(request: InsertRoomSizeRequestDTO): Promise<RoomSize> {
    return this.roomSizeService.insert(request);
  }
  public delete(request: DeleteRoomSizeRequestDTO): Promise<boolean> {
    return this.roomSizeService.delete(request);
  }
}
