import { ReservationDetail } from "../models/reservation-detail";
import { DeleteReservationDetailRequestDTO } from "../requests/reservation-detail/delete-reservation-detail.request.dto";
import { GetReservationDetailRequestDTO } from "../requests/reservation-detail/get-reservation-detail.request.dto";
import { InsertReservationDetailRequestDTO } from "../requests/reservation-detail/insert-reservation-detail.request.dto";
import { UpdateReservationDetailRequestDTO } from "../requests/reservation-detail/update-reservation-detail.request.dto";
import { ReservationDetailService } from "../services/reservation-detail.service";

export class ReservationDetailController {
  constructor(
    private readonly reservationDetailService: ReservationDetailService
  ) {}
  public get(
    request: GetReservationDetailRequestDTO
  ): Promise<ReservationDetail | ReservationDetail[]> {
    return this.reservationDetailService.get(request);
  }
  public update(
    request: UpdateReservationDetailRequestDTO
  ): Promise<ReservationDetail> {
    return this.reservationDetailService.update(request);
  }
  public insert(
    request: InsertReservationDetailRequestDTO
  ): Promise<ReservationDetail> {
    return this.reservationDetailService.insert(request);
  }
  public delete(request: DeleteReservationDetailRequestDTO): Promise<boolean> {
    return this.reservationDetailService.delete(request);
  }
}
