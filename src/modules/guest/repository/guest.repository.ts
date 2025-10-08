import { Kysely } from "kysely";
import { Repository } from "@shared/repositories/repository";
import { GuestTable } from "@shared/database-models/guest.database-model";
import { Guest } from "../models/guest";

interface GetGuestConfig {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  limit?: number;
  offset?: number;
}

interface UpdateGuestConfig {
  phone: string;
  name?: string;
  email?: string;
  newPhone?: string;
}

interface InsertGuestConfig {
  name: string;
  phone: string;
  email: string;
}
interface DeleteGuestConfig {
  phone: string;
}

interface GetById {
  id: number;
}
export abstract class GuestRepository extends Repository {
  abstract get(getGuest: GetGuestConfig): Promise<Guest | Guest[]>;
  abstract update(updateGuestConfig: UpdateGuestConfig): Promise<Guest>;
  abstract insert(insertGuestConfig: InsertGuestConfig): Promise<Guest>;
  abstract delete(deleteGuestConfig: DeleteGuestConfig): Promise<boolean>;
}

export class KyselyGuestRepository extends GuestRepository {
  constructor(private readonly kysely: Kysely<GuestTable>) {
    super();
  }

  public get(getGuest: GetGuestConfig): Promise<Guest | Guest[]> {
    if (getGuest.id) {
      return this.getById({ id: getGuest.id });
    }
    if (getGuest.name) {
      return this.getByName(getGuest);
    }
    if (getGuest.limit != null && getGuest.offset != null) {
      return this.getAll(getGuest);
    }
  }

  public update(updateGuestConfig: UpdateGuestConfig): Promise<Guest> {
    if (updateGuestConfig.name) {
      return this.updateName(updateGuestConfig);
    }
    if (updateGuestConfig.newPhone) {
      return this.updatePhone(updateGuestConfig);
    }
  }

  public insert(insertGuestConfig: InsertGuestConfig): Promise<Guest> {
    return this.kysely
      .insertInto("Guest")
      .values({
        name: insertGuestConfig.name,
        phone: insertGuestConfig.phone,
        email: insertGuestConfig.email
      })
      .execute()
      .then((result) => this.getById({ id: Number(result[0].insertId) }));
  }

  public delete(deleteGuestConfig: DeleteGuestConfig): Promise<boolean> {
    return this.kysely
      .deleteFrom("Guest")
      .where("Guest.phone", "=", deleteGuestConfig.phone)
      .execute()
      .then(() => true);
  }

  private getById(config: GetById): Promise<Guest> {
    return this.kysely
      .selectFrom("Guest")
      .selectAll() //
      .where("Guest.id", "=", config.id)
      .executeTakeFirstOrThrow()
      .then(
        (guest) =>
          new Guest({
            id: guest.id,
            name: guest.name,
            phone: guest.phone,
            email: guest.email
          })
      );
  }

  private getAll(getGuestConfig: GetGuestConfig): Promise<Guest[]> {
    return (
      this.kysely
        .selectFrom("Guest")
        .selectAll()
        .limit(getGuestConfig.limit)
        .offset(getGuestConfig.offset)
        .execute()
        .then((guests) => {
          return guests.map((guest) => new Guest(guest));
        })
    );
  }

  private getByName(getGuestConfig: GetGuestConfig): Promise<Guest[]> {
    return this.kysely
      .selectFrom("Guest")
      .selectAll()
      .where("Guest.name", "=", getGuestConfig.name)
      .limit(getGuestConfig.limit)
      .offset(getGuestConfig.offset)
      .execute()
      .then((guests) => guests.map((guest) => new Guest(guest)));
  }

  private getByPhone(getGuestConfig: GetGuestConfig): Promise<Guest> {
    return this.kysely
      .selectFrom("Guest")
      .selectAll() //
      .where("Guest.phone", "=", getGuestConfig.phone)
      .executeTakeFirst()
      .then(
        (guest) =>
          new Guest({
            id: guest.id,
            name: guest.name,
            phone: guest.phone,
            email: guest.email
          })
      );
  }

  private updateName(updateGuestConfig: UpdateGuestConfig): Promise<Guest> {
    return this.kysely
      .updateTable("Guest")
      .set({
        name: updateGuestConfig.name,
      })
      .where("Guest.phone", "=", updateGuestConfig.phone)
      .execute()
      .then(() => this.getByPhone({ phone: updateGuestConfig.phone }));
  }

  private updatePhone(updateGuestConfig: UpdateGuestConfig): Promise<Guest> {
    return this.kysely
      .updateTable("Guest")
      .set({
        phone: updateGuestConfig.newPhone,
      })
      .where("Guest.phone", "=", updateGuestConfig.phone)
      .execute()
      .then(() => this.getByPhone({ phone: updateGuestConfig.phone }));
  }
}
