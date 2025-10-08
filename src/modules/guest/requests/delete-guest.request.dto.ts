import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidPhone,
} from "@shared/validation-functions";
export interface DeleteGuestRequest {
  phone: unknown;
}

function validate(request: DeleteGuestRequest): void {
  if (request.phone && !isValidPhone(request.phone)) {
    throw new InvalidRequestException();
  }
}

export class DeleteGuestRequestDTO {
  phone: string;

  constructor(DeleteGuestRequest: {
    phone: string;
  }) {
    this.phone = DeleteGuestRequest.phone;
  }

  public static fromRequest(
    request: DeleteGuestRequest
  ): DeleteGuestRequestDTO {
    validate(request);
    return new DeleteGuestRequestDTO({
      phone: request.phone == null ? null : String(request.phone),
    });
  }
}
