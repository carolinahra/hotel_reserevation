import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,
  isValidPhone,
  isValidEmail,
} from "@shared/validation-functions";
export interface UpdateGuestRequest {
  phone: unknown;
  name?: unknown;
  newPhone?: unknown;
  email?: unknown;
}

function validate(request: UpdateGuestRequest): void {
  if (request.phone && !isValidPhone(request.phone)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.newPhone && !isValidPhone(request.newPhone)) {
    throw new InvalidRequestException();
  }
  if (request.email && !isValidEmail(request.email)) {
    throw new InvalidRequestException();
  }
}

export class UpdateGuestRequestDTO {
  phone: string;
  name?: string;
  newPhone?: string;
  email?: string;

  constructor(updateGuestRequest: {
    phone: string;
    name?: string;
    newPhone: string;
    email?: string;
  }) {
    this.phone = updateGuestRequest.phone;
    this.name = updateGuestRequest.name;
    this.newPhone = updateGuestRequest.newPhone;
    this.email = updateGuestRequest.email;
  }

  public static fromRequest(
    request: UpdateGuestRequest
  ): UpdateGuestRequestDTO {
    validate(request);
    return new UpdateGuestRequestDTO({
      phone: request.phone == null ? null : String(request.phone),
      name: request.name == null ? null : String(request.name),
      newPhone: request.newPhone == null ? null : String(request.newPhone),
      email: request.email == null ? null : String(request.email),
    });
  }
}
