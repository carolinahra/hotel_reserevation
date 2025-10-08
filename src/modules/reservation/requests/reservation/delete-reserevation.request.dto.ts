import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import { isValidExternalReference } from "@shared/validation-functions";

interface DeleteReservationRequest {
  externalReference: unknown;
}

function validate(request: DeleteReservationRequest) {
  if (
    request.externalReference &&
    !isValidExternalReference(request.externalReference)
  ) {
    throw new InvalidRequestException();
  }
}

export class DeleteReservationRequestDTO {
  externalReference: string;

  constructor(DeleteReservationRequest: { externalReference: string }) {
    this.externalReference = DeleteReservationRequest.externalReference;
  }

  public static fromRequest(
    request: DeleteReservationRequest
  ): DeleteReservationRequestDTO {
    validate(request);
    return new DeleteReservationRequestDTO({
      externalReference:
        request.externalReference == null
          ? null
          : String(request.externalReference),
    });
  }
}
