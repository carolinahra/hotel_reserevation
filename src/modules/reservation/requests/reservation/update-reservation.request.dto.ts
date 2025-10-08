import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidDate,
  isValidExternalReference,
  isValidString,
} from "@shared/validation-functions";

interface UpdateReservationRequest {
  externalReference: unknown;
  paymentStatus?: unknown;
  checkInDate?: unknown;
  checkoutDate?: unknown;
}

function validate(request: UpdateReservationRequest) {
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
  if (request.checkoutDate && !isValidDate(request.checkoutDate)) {
    throw new InvalidRequestException();
  }
}

export class UpdateReservationRequestDTO {
  externalReference: string;
  paymentStatus?: string;
  checkInDate?: string;
  checkoutDate?: string;

  constructor(updateReservationRequest: {
    externalReference: string;
    paymentStatus?: string;
    checkInDate?: string;
    checkoutDate?: string;
  }) {
    (this.externalReference = updateReservationRequest.externalReference),
      (this.paymentStatus = updateReservationRequest.paymentStatus),
      (this.checkInDate = updateReservationRequest.checkInDate),
      (this.checkoutDate = updateReservationRequest.checkoutDate);
  }

  public static fromRequest(
    request: UpdateReservationRequest
  ): UpdateReservationRequestDTO {
    validate(request);
    return new UpdateReservationRequestDTO({
      externalReference:
        request.externalReference == null
          ? null
          : String(request.externalReference),
      checkInDate:
        request.checkInDate == null ? null : String(request.checkInDate),
      checkoutDate:
        request.checkoutDate == null ? null : String(request.checkoutDate),
      paymentStatus: request.paymentStatus == null ? null : String(request),
    });
  }
}
