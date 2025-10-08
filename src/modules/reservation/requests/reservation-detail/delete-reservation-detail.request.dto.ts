import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import { isValidId } from "@shared/validation-functions";

interface DeleteReservationDetailRequest {
  id: unknown;
}
function validate(request: DeleteReservationDetailRequest) {
  if (request.id && !isValidId(request.id)) {
    throw new InvalidRequestException();
  }
}
export class DeleteReservationDetailRequestDTO {
  public id: number;

  constructor(deleteReservationDetailRequest: { id: number }) {
    this.id = deleteReservationDetailRequest.id;
  }

  public static fromRequest(
    request: DeleteReservationDetailRequest
  ): DeleteReservationDetailRequestDTO {
    validate(request);
    return new DeleteReservationDetailRequestDTO({
      id: request.id == null ? null : Number(request.id),
    });
  }
}
