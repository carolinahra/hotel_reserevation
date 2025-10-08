import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidDate,
  isValidLimit,
  isValidOffset,
} from "@shared/validation-functions";

interface GetReservationDetailRequest {
  id?: unknown;
  reservationId?: unknown;
  roomId?: unknown;
  extraServiceId?: unknown;
  limit?: unknown;
  offset?: unknown;
}
function validate(request: GetReservationDetailRequest) {
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
  if (request.limit && !isValidLimit(request.limit)) {
    throw new InvalidRequestException();
  }
  if (request.offset && !isValidOffset(request.offset)) {
    throw new InvalidRequestException();
  }
}
export class GetReservationDetailRequestDTO {
  public id?: number;
  public reservationId?: number;
  public roomId?: number;
  public extraServiceId?: number;
  public limit?: number;
  public offset?: number;

  constructor(getReservationDetailRequest: {
    id?: number;
    reservationId?: number;
    roomId?: number;
    extraServiceId?: number;
    limit?: number;
    offset?: number;
  }) {
    (this.id = getReservationDetailRequest.id),
      (this.reservationId = getReservationDetailRequest.reservationId),
      (this.roomId = getReservationDetailRequest.roomId),
      (this.extraServiceId = getReservationDetailRequest.extraServiceId);
    this.limit = getReservationDetailRequest.limit;
    this.offset = getReservationDetailRequest.offset;
  }

  public static fromRequest(
    request: GetReservationDetailRequest
  ): GetReservationDetailRequestDTO {
    validate(request);
    return new GetReservationDetailRequestDTO({
      id: request.id == null ? null : Number(request.id),
      roomId: request.roomId == null ? null : Number(request.roomId),
      reservationId:
        request.reservationId == null ? null : Number(request.reservationId),
      extraServiceId:
        request.extraServiceId == null ? null : Number(request.extraServiceId),
      limit: request.limit == null ? null : Number(request.limit),
      offset: request.offset == null ? null : Number(request.offset),
    });
  }
}
