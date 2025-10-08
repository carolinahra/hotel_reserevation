import { Repository } from "@shared/repositories/repository";
import { Kysely } from "kysely";
import { Room } from "../models/room";
import { RoomTable } from "@shared/database-models/room.database-model";

export abstract class RoomRepository extends Repository {
  abstract get(getRoom: GetRoomConfig): Promise<Room | Room[]>;
  abstract update(updateRoomConfig: UpdateRoomConfig): Promise<Room>;
  abstract insert(insertRoomConfig: InsertRoomConfig): Promise<Room>;
  abstract delete(deleteRoomConfig: DeleteRoomConfig): Promise<boolean>;
}

interface GetRoomConfig {
  id?: number;
  name?: string;
  sizeId?: number;
  limit?: number;
  offset?: number;
}

interface UpdateRoomConfig {
  name: string;
  availability?: string;
  price?: number;
}

interface InsertRoomConfig {
  name: string;
  sizeId: number;
  price: number;
  availability: string;
}
interface DeleteRoomConfig {
  name: string;
}

interface GetById {
  id: number;
}

export class KyselyRoomRepository extends RoomRepository {
  constructor(private readonly kysely: Kysely<RoomTable>) {
    super();
  }

  public get(getRoom: GetRoomConfig): Promise<Room | Room[]> {
    if (getRoom.id) {
      return this.getById({ id: getRoom.id });
    }
    if (getRoom.name) {
      return this.getByName(getRoom);
    }
    if (getRoom.limit != null && getRoom.offset != null) {
      return this.getAll(getRoom);
    }
  }

  public update(updateRoomConfig: UpdateRoomConfig): Promise<Room> {
    if (updateRoomConfig.price) {
      return this.updatePrice(updateRoomConfig);
    }
    if (updateRoomConfig.availability) {
      return this.updateAvailability(updateRoomConfig);
    }
  }

  public insert(insertRoomConfig: InsertRoomConfig): Promise<Room> {
    return this.kysely
      .insertInto("Room")
      .values({
        name: insertRoomConfig.name,
        room_size_id: insertRoomConfig.sizeId,
        price: insertRoomConfig.price,
        availability: insertRoomConfig.availability,
      })
      .executeTakeFirst()
      .then((result) => this.getById({ id: Number(result.insertId) }));
  }

  public delete(deleteRoomConfig: DeleteRoomConfig): Promise<boolean> {
    return this.kysely
      .deleteFrom("Room")
      .where("Room.name", "=", deleteRoomConfig.name)
      .executeTakeFirst()
      .then(() => true);
  }

  private getById(config: GetById): Promise<Room> {
    return this.kysely
      .selectFrom("Room")
      .selectAll() //
      .where("Room.id", "=", config.id)
      .executeTakeFirstOrThrow()
      .then(
        (room) =>
          new Room({
            id: room.id,
            name: room.name,
            room_size_id: room.room_size_id,
            price: room.price,
            availability: room.availability,
            created_at: room.created_at,
            updated_at: room.updated_at,
          })
      );
  }

  private getAll(getRoomConfig: GetRoomConfig): Promise<Room[]> {
    return this.kysely
      .selectFrom("Room")
      .selectAll()
      .limit(getRoomConfig.limit)
      .offset(getRoomConfig.offset)
      .execute()
      .then((rooms) => {
        return rooms.map((room) => new Room(room));
      });
  }

  private getByName(getRoomConfig: GetRoomConfig): Promise<Room> {
    return this.kysely
      .selectFrom("Room")
      .selectAll()
      .where("Room.name", "=", getRoomConfig.name)
      .limit(getRoomConfig.limit)
      .offset(getRoomConfig.offset)
      .executeTakeFirst()
      .then(
        (room) =>
          new Room({
            id: room.id,
            name: room.name,
            room_size_id: room.room_size_id,
            price: room.price,
            availability: room.availability,
            created_at: room.created_at,
            updated_at: room.updated_at,
          })
      );
  }

  private getBysizeId(getRoomConfig: GetRoomConfig): Promise<Room> {
    return this.kysely
      .selectFrom("Room")
      .selectAll() //
      .where("Room.room_size_id", "=", getRoomConfig.sizeId)
      .executeTakeFirst()
      .then(
        (room) =>
          new Room({
            id: room.id,
            name: room.name,
            room_size_id: room.room_size_id,
            price: room.price,
            availability: room.availability,
            created_at: room.created_at,
            updated_at: room.updated_at,
          })
      );
  }

  private updatePrice(updateRoomConfig: UpdateRoomConfig) {
    return this.kysely
      .updateTable("Room")
      .set({
        price: updateRoomConfig.price,
      })
      .where("Room.name", "=", updateRoomConfig.name)
      .execute()
      .then(() => this.getByName({ name: updateRoomConfig.name }));
  }

  private updateAvailability(updateRoomConfig: UpdateRoomConfig) {
    return this.kysely
      .updateTable("Room")
      .set({ availability: updateRoomConfig.availability })
      .where("Room.name", "=", updateRoomConfig.name)
      .execute()
      .then(() => this.getByName({ name: updateRoomConfig.name }));
  }
}
