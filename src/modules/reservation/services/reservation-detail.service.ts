import { ReservationDetail } from "../models/reservation-detail";
import { ReservationDetailRepository } from "../repositories/reservation-detail.repository";

interface GetReservationDetail {
  id?: number;
  reservationId?: number;
  roomId?: number;
  extraServiceId?: number;
}
interface UpdateReservationDetail {
  id: number;
  reservationId?: number;
  roomId?: number;
  extraServiceId?: number;
}
interface InsertReservationDetail {
  reservationId: number;
  roomId: number;
  extraServiceId: number;
}
interface DeleteReservationDetail {
  id: number;
}

export class ReservationDetailService {
  constructor(private readonly repository: ReservationDetailRepository) {}

  public get(
    getReservationDetail: GetReservationDetail
  ): Promise<ReservationDetail | ReservationDetail[]> {
    return this.repository.get(getReservationDetail);
  }
  public update(
    updateReservationDetail: UpdateReservationDetail
  ): Promise<ReservationDetail> {
    return this.repository.update(updateReservationDetail);
  }
  public insert(
    insertReservationDetail: InsertReservationDetail
  ): Promise<ReservationDetail> {
    return this.repository.insert(insertReservationDetail);
  }
  public delete(
    deleteReservationDetail: DeleteReservationDetail
  ): Promise<boolean> {
    return this.repository.delete(deleteReservationDetail);
  }
}
