import { ReservationTable } from "@shared/database-models/reservation.database-model";
import { Repository } from "@shared/repositories/repository";
import { Kysely } from "kysely";
import { Reservation } from "../models/reservation";

interface GetReservationConfig {
  id?: number;
  externalReference?: string;
  guestId?: number;
  checkInDate?: string;
  limit?: number;
  offset?: number;
}

interface InsertReservationConfig {
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
}

interface UpdateReservationConfig {
  externalReference: string;
  paymentStatus?: string;
  checkInDate?: string;
  checkoutDate?: string;
}

interface DeleteReservationConfig {
  externalReference: string;
}

interface getByIdConfig {
  id: number;
}
export abstract class ReservationRepository extends Repository {
  abstract get(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation | Reservation[]>;
  abstract update(
    updateReservationConfig: UpdateReservationConfig
  ): Promise<Reservation>;
  abstract insert(
    insertReservationConfig: InsertReservationConfig
  ): Promise<Reservation>;
  abstract delete(
    deleteReservationConfig: DeleteReservationConfig
  ): Promise<boolean>;
}

export class KyselyReservationRepository extends ReservationRepository {
  constructor(private readonly kysely: Kysely<ReservationTable>) {
    super();
  }

  public get(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation | Reservation[]> {
    if (getReservationConfig.id) {
      return this.getById({ id: getReservationConfig.id });
    }
    if (getReservationConfig.externalReference) {
      return this.getByExternalReference(getReservationConfig);
    }
    if (getReservationConfig.guestId) {
      return this.getByGuestId(getReservationConfig);
    }
    if (getReservationConfig.checkInDate) {
      return this.getByCheckInDate(getReservationConfig);
    }
    if (getReservationConfig.limit && getReservationConfig.offset) {
      return this.getAll(getReservationConfig);
    }
  }

  public update(
    updateReservationConfig: UpdateReservationConfig
  ): Promise<Reservation> {
    if (updateReservationConfig.checkInDate) {
      return this.updateCheckInDate(updateReservationConfig);
    }
    if (updateReservationConfig.checkoutDate) {
      return this.updateCheckOutDate(updateReservationConfig);
    }
    if (updateReservationConfig.paymentStatus) {
      return this.updatePaymentStatus(updateReservationConfig);
    }
  }

  public insert(
    insertReservationConfig: InsertReservationConfig
  ): Promise<Reservation> {
    return this.kysely
      .insertInto("Reservation")
      .values({
        guest_id: insertReservationConfig.guestId,
        external_reference: insertReservationConfig.externalReference,
        total_price: insertReservationConfig.totalPrice,
        payment_status: insertReservationConfig.paymentStatus,
        check_in_date: insertReservationConfig.checkInDate,
        check_out_date: insertReservationConfig.checkOutDate,
      })

      .executeTakeFirst()
      .then((result) => this.getById({ id: Number(result.insertId) }));
  }

  public delete(
    deleteReservationConfig: DeleteReservationConfig
  ): Promise<boolean> {
    return this.kysely
      .deleteFrom("Reservation")
      .where(
        "Reservation.external_reference",
        "=",
        deleteReservationConfig.externalReference
      )
      .execute()
      .then(() => true);
  }

  private getById(config: getByIdConfig): Promise<Reservation> {
    return this.kysely
      .selectFrom("Reservation")
      .selectAll()
      .where("Reservation.id", "=", config.id)
      .executeTakeFirst()
      .then(
        (reservation) =>
          new Reservation({
            id: reservation.id,
            guest_id: reservation.guest_id,
            external_reference: reservation.external_reference,
            payment_status: reservation.payment_status,
            total_price: reservation.total_price,
            check_in_date: reservation.check_in_date,
            check_out_date: reservation.check_out_date,
            created_at: reservation.created_at,
            updated_at: reservation.updated_at,
          })
      );
  }

  private getAll(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation[]> {
    return this.kysely
      .selectFrom("Reservation")
      .selectAll()
      .limit(getReservationConfig.limit)
      .offset(getReservationConfig.offset)
      .execute()
      .then((reservations) =>
        reservations.map((reservation) => new Reservation(reservation))
      );
  }

  private getByExternalReference(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation> {
    return this.kysely
      .selectFrom("Reservation")
      .selectAll()
      .where(
        "Reservation.external_reference",
        "=",
        getReservationConfig.externalReference
      )
      .executeTakeFirst()
      .then(
        (reservation) =>
          new Reservation({
            id: reservation.id,
            guest_id: reservation.guest_id,
            external_reference: reservation.external_reference,
            payment_status: reservation.payment_status,
            total_price: reservation.total_price,
            check_in_date: reservation.check_in_date,
            check_out_date: reservation.check_out_date,
            created_at: reservation.created_at,
            updated_at: reservation.updated_at,
          })
      );
  }

  private getByGuestId(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation[]> {
    return this.kysely
      .selectFrom("Reservation")
      .selectAll()
      .where("Reservation.guest_id", "=", getReservationConfig.guestId)
      .limit(getReservationConfig.limit)
      .offset(getReservationConfig.offset)
      .execute()
      .then((reservations) =>
        reservations.map((reservation) => new Reservation(reservation))
      );
  }

  private getByCheckInDate(
    getReservationConfig: GetReservationConfig
  ): Promise<Reservation[]> {
    return this.kysely
      .selectFrom("Reservation")
      .selectAll()
      .where("Reservation.check_in_date", "=", getReservationConfig.checkInDate)
      .limit(getReservationConfig.limit)
      .offset(getReservationConfig.offset)
      .execute()
      .then((reservations) =>
        reservations.map((reservation) => new Reservation(reservation))
      );
  }

  private updateCheckInDate(
    updateReservationConfig: UpdateReservationConfig
  ): Promise<Reservation> {
    return this.kysely
      .updateTable("Reservation")
      .set({
        check_in_date: updateReservationConfig.checkInDate,
      })
      .where(
        "Reservation.external_reference",
        "=",
        updateReservationConfig.externalReference
      )
      .executeTakeFirst()
      .then(() =>
        this.getByExternalReference({
          externalReference: updateReservationConfig.externalReference,
        })
      );
  }
  private updateCheckOutDate(
    updateReservationConfig: UpdateReservationConfig
  ): Promise<Reservation> {
    return this.kysely
      .updateTable("Reservation")
      .set({
        check_out_date: updateReservationConfig.checkoutDate,
      })
      .where(
        "Reservation.external_reference",
        "=",
        updateReservationConfig.externalReference
      )
      .executeTakeFirst()
      .then(() =>
        this.getByExternalReference({
          externalReference: updateReservationConfig.externalReference,
        })
      );
  }
  private updatePaymentStatus(
    updateReservationConfig: UpdateReservationConfig
  ): Promise<Reservation> {
    return this.kysely
      .updateTable("Reservation")
      .set({
        payment_status: updateReservationConfig.paymentStatus,
      })
      .where(
        "Reservation.external_reference",
        "=",
        updateReservationConfig.externalReference
      )
      .executeTakeFirst()
      .then(() =>
        this.getByExternalReference({
          externalReference: updateReservationConfig.externalReference,
        })
      );
  }
}
