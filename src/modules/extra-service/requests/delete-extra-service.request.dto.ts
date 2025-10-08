import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import { isValidName } from "@shared/validation-functions";
export interface DeleteExtraServiceRequest {
  name: unknown;
}

function validate(request: DeleteExtraServiceRequest): void {
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
}

export class DeleteExtraServiceRequestDTO {
  name: string;

  constructor(deleteExtraServiceRequest: { name: string }) {
    this.name = deleteExtraServiceRequest.name;
  }

  public static fromRequest(
    request: DeleteExtraServiceRequest
  ): DeleteExtraServiceRequestDTO {
    validate(request);
    return new DeleteExtraServiceRequestDTO({
      name: request.name == null ? null : String(request.name),
    });
  }
}
