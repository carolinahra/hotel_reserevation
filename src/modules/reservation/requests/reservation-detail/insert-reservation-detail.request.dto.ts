import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,

} from "@shared/validation-functions";

interface InsertReservationDetailRequest {
  reservationId: unknown;
  roomId: unknown;
  extraServiceId: unknown;
}
function validate(request: InsertReservationDetailRequest) {
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
export class InsertReservationDetailRequestDTO {
  public reservationId: number;
  public roomId: number;
  public extraServiceId: number;

  constructor(insertReservationDetailRequest: {
    reservationId: number;
    roomId: number;
    extraServiceId: number;
  }) {
    (this.reservationId = insertReservationDetailRequest.reservationId),
      (this.roomId = insertReservationDetailRequest.roomId),
      (this.extraServiceId = insertReservationDetailRequest.extraServiceId);
  }

  public static fromRequest(
    request: InsertReservationDetailRequest
  ): InsertReservationDetailRequestDTO {
    validate(request);
    return new InsertReservationDetailRequestDTO({
      roomId: request.roomId == null ? null : Number(request.roomId),
      reservationId:
        request.reservationId == null ? null : Number(request.reservationId),
      extraServiceId:
        request.extraServiceId == null ? null : Number(request.extraServiceId),
    });
  }
}
