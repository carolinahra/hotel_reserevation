import { Reservation } from "../models/reservation";
import { ReservationRepository } from "../repositories/reservation.repository";

interface GetReservation {
  id?: number;
  externalReference?: string;
  guestId?: number;
  checkInDate?: string;
  limit?: number;
  offset?: number;
}

interface InsertReservation {
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
}

interface UpdateReservation {
  externalReference: string;
  paymentStatus?: string;
  checkInDate?: string;
  checkoutDate?: string;
}

interface DeleteReservation {
  externalReference: string;
}

export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  public get(
    getReservation: GetReservation
  ): Promise<Reservation | Reservation[]> {
    return this.reservationRepository.get(getReservation);
  }

  public update(updateReservation: UpdateReservation): Promise<Reservation> {
    return this.reservationRepository.update(updateReservation);
  }

  public insert(insertReservation: InsertReservation): Promise<Reservation> {
    return this.reservationRepository.insert(insertReservation);
  }

  public delete(deleteReservation: DeleteReservation): Promise<boolean> {
    return this.reservationRepository.delete(deleteReservation);
  }
}
