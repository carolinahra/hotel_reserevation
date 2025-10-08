import { RoomSizeTable } from "@shared/database-models/room-size.database-model";
import { Repository } from "@shared/repositories/repository";
import { Kysely } from "kysely";
import { RoomSize } from "../models/room-size";

export abstract class RoomSizeRepository extends Repository {
  abstract get(getRoomSize: GetRoomSizeConfig): Promise<RoomSize | RoomSize[]>;
  abstract insert(
    insertRoomSizeConfig: InsertRoomSizeConfig
  ): Promise<RoomSize>;
  abstract update(
    updateRoomSizeConfig: UpdateRoomSizeConfig
  ): Promise<RoomSize>;
  abstract delete(deleteRoomSizeCofig: DeleteRoomSizeConfig): Promise<boolean>;
}

interface GetRoomSizeConfig {
  id?: number;
  name?: string;
  size?: string;
  limit?: number;
  offset?: number;
}
interface InsertRoomSizeConfig {
  name: string;
  size: string;
}
interface UpdateRoomSizeConfig {
  name: string;
  size?: string;
  newName?: string;
}
interface DeleteRoomSizeConfig {
  name: string;
}
interface GetByIdConfig {
  id: number;
}

export class KyselyRoomSizeRepository extends RoomSizeRepository {
  constructor(private readonly kysely: Kysely<RoomSizeTable>) {
    super();
  }

  public get(getRoomSize: GetRoomSizeConfig): Promise<RoomSize | RoomSize[]> {
    if (getRoomSize.id) {
      return this.getById({ id: getRoomSize.id });
    }
    if (getRoomSize.name) {
      return this.getByName(getRoomSize);
    }
    if (getRoomSize.size) {
      return this.getBySize(getRoomSize);
    }
    if (getRoomSize.limit && getRoomSize.offset) {
      return this.getAll(getRoomSize);
    }
  }

  public update(updateRoomSizeConfig: UpdateRoomSizeConfig): Promise<RoomSize> {
    if (updateRoomSizeConfig.newName) {
      return this.updateName(updateRoomSizeConfig);
    }
    if (updateRoomSizeConfig.size) {
      return this.updateSize(updateRoomSizeConfig);
    }
  }

  public insert(insertRoomSizeConfig: InsertRoomSizeConfig): Promise<RoomSize> {
    return this.kysely
      .insertInto("Room_Size")
      .values({
        name: insertRoomSizeConfig.name,
        size: insertRoomSizeConfig.size,
      })
      .executeTakeFirst()
      .then((result) => this.getById({ id: Number(result.insertId) }));
  }

  public delete(deleteRoomSizeCofig: DeleteRoomSizeConfig): Promise<boolean> {
    return this.kysely
      .deleteFrom("Room_Size")
      .where("Room_Size.name", "=", deleteRoomSizeCofig.name)
      .execute()
      .then(() => true);
  }

  private getAll(getRoomSizeConfig: GetRoomSizeConfig) {
    return this.kysely
      .selectFrom("Room_Size")
      .selectAll()
      .limit(getRoomSizeConfig.limit)
      .offset(getRoomSizeConfig.offset)
      .execute()
      .then((roomSizes) => roomSizes.map((roomSize) => new RoomSize(roomSize)));
  }

  private getById(config: GetByIdConfig): Promise<RoomSize> {
    return this.kysely
      .selectFrom("Room_Size")
      .selectAll()
      .where("Room_Size.id", "=", config.id)
      .executeTakeFirst()
      .then(
        (roomSize) =>
          new RoomSize({
            id: roomSize.id,
            name: roomSize.name,
            size: roomSize.size,
          })
      );
  }

  private getByName(getRoomSizeConfig: GetRoomSizeConfig): Promise<RoomSize> {
    return this.kysely
      .selectFrom("Room_Size")
      .selectAll()
      .where("Room_Size.name", "=", getRoomSizeConfig.name)
      .executeTakeFirst()
      .then(
        (roomSize) =>
          new RoomSize({
            id: roomSize.id,
            name: roomSize.name,
            size: roomSize.size,
          })
      );
  }

  private getBySize(getRoomSizeConfig: GetRoomSizeConfig): Promise<RoomSize[]> {
    return this.kysely
      .selectFrom("Room_Size")
      .selectAll()
      .where("Room_Size.size", "=", getRoomSizeConfig.size)
      .limit(getRoomSizeConfig.limit)
      .offset(getRoomSizeConfig.offset)
      .execute()
      .then((roomSizes) => roomSizes.map((roomSize) => new RoomSize(roomSize)));
  }

  private updateName(
    updateRoomSizeConfig: UpdateRoomSizeConfig
  ): Promise<RoomSize> {
    return this.kysely
      .updateTable("Room_Size")
      .set({
        name: updateRoomSizeConfig.newName,
      })
      .where("Room_Size.name", "=", updateRoomSizeConfig.name)
      .executeTakeFirst()
      .then(() => this.getByName({ name: updateRoomSizeConfig.name }));
  }

  private updateSize(
    updateRoomSizeConfig: UpdateRoomSizeConfig
  ): Promise<RoomSize> {
    return this.kysely
      .updateTable("Room_Size")
      .set({
        size: updateRoomSizeConfig.size,
      })
      .where("Room_Size.name", "=", updateRoomSizeConfig.name)
      .execute()
      .then(() => this.getByName({ name: updateRoomSizeConfig.name }));
  }
}
