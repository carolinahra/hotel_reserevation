import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidDate,
  isValidExternalReference,
  isValidId,
  isValidPrice,
  isValidString,
} from "@shared/validation-functions";

interface InsertReservationRequest {
  guestId: unknown;
  externalReference: unknown;
  totalPrice: unknown;
  paymentStatus: unknown;
  checkInDate: unknown;
  checkOutDate: unknown;
}

function validate(request: InsertReservationRequest) {
  if (request.guestId && !isValidId(request.guestId)) {
    throw new InvalidRequestException();
  }
  if (
    request.externalReference &&
    !isValidExternalReference(request.externalReference)
  ) {
    throw new InvalidRequestException();
  }
  if (request.paymentStatus && !isValidString(request.paymentStatus)) {
    throw new InvalidRequestException();
  }
  if (request.checkInDate && !isValidDate(request.checkInDate)) {
    throw new InvalidRequestException();
  }
  if (request.checkOutDate && !isValidDate(request.checkOutDate)) {
    throw new InvalidRequestException();
  }
  if (request.totalPrice && !isValidPrice(request.totalPrice)) {
    throw new InvalidRequestException();
  }
}

export class InsertReservationRequestDTO {
  guestId: number;
  externalReference: string;
  totalPrice: number;
  paymentStatus: string;
  checkInDate: string;
  checkOutDate: string;
  constructor(insertReservationRequest: {
    guestId: number;
    externalReference: string;
    totalPrice: number;
    paymentStatus: string;
    checkInDate: string;
    checkOutDate: string;
  }) {
    (this.externalReference = insertReservationRequest.externalReference),
      (this.paymentStatus = insertReservationRequest.paymentStatus),
      (this.checkInDate = insertReservationRequest.checkInDate),
      (this.checkOutDate = insertReservationRequest.checkOutDate);
  }

  public static fromRequest(
    request: InsertReservationRequest
  ): InsertReservationRequestDTO {
    validate(request);
    return new InsertReservationRequestDTO({
      guestId: request.guestId == null ? null : Number(request.guestId),
      externalReference:
        request.externalReference == null
          ? null
          : String(request.externalReference),
      totalPrice:
        request.totalPrice == null ? null : Number(request.totalPrice),
      checkInDate:
        request.checkInDate == null ? null : String(request.checkInDate),
      checkOutDate:
        request.checkOutDate == null ? null : String(request.checkOutDate),
      paymentStatus: request.paymentStatus == null ? null : String(request),
    });
  }
}
