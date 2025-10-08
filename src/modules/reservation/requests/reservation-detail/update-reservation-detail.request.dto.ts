import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import { isValidId } from "@shared/validation-functions";

interface UpdateReservationDetailRequest {
  id: unknown;
  reservationId?: unknown;
  roomId?: unknown;
  extraServiceId?: unknown;
}
function validate(request: UpdateReservationDetailRequest) {
  if (request.id && !isValidId(request.id)) {
    throw new InvalidRequestException();
  }
  if (request.roomId && !isValidId(request.roomId)) {
    throw new InvalidRequestException();
  }
  if (request.reservationId && !isValidId(request.reservationId)) {
    throw new InvalidRequestException();
  }
  if (request.extraServiceId && !isValidId(request.extraServiceId)) {
    throw new InvalidRequestException();
  }
}
export class UpdateReservationDetailRequestDTO {
  public id: number;
  public reservationId?: number;
  public roomId?: number;
  public extraServiceId?: number;

  constructor(updateReservationDetailRequest: {
    id: number;
    reservationId?: number;
    roomId?: number;
    extraServiceId?: number;
  }) {
    (this.id = updateReservationDetailRequest.id),
      (this.reservationId = updateReservationDetailRequest.reservationId),
      (this.roomId = updateReservationDetailRequest.roomId),
      (this.extraServiceId = updateReservationDetailRequest.extraServiceId);
  }

  public static fromRequest(
    request: UpdateReservationDetailRequest
  ): UpdateReservationDetailRequestDTO {
    validate(request);
    return new UpdateReservationDetailRequestDTO({
      id: request.id == null ? null : Number(request.id),
      roomId: request.roomId == null ? null : Number(request.roomId),
      reservationId:
        request.reservationId == null ? null : Number(request.reservationId),
      extraServiceId:
        request.extraServiceId == null ? null : Number(request.extraServiceId),
    });
  }
}
