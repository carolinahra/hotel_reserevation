import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,
  isValidPhone,
  isValidEmail,
} from "@shared/validation-functions";
export interface InsertGuestRequest {
  phone: unknown;
  name: unknown;
  email: unknown;
}

function validate(request: InsertGuestRequest): void {
  if (request.phone && !isValidPhone(request.phone)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.email && !isValidEmail(request.email)) {
    throw new InvalidRequestException();
  }
}

export class InsertGuestRequestDTO {
  phone: string;
  name: string;
  email: string;

  constructor(insertGuestRequest: {
    phone: string;
    name: string;
    email: string;
  }) {
    this.phone = insertGuestRequest.phone;
    this.name = insertGuestRequest.name;
    this.email = insertGuestRequest.email;
  }

  public static fromRequest(
    request: InsertGuestRequest
  ): InsertGuestRequestDTO {
    validate(request);
    return new InsertGuestRequestDTO({
      phone: request.phone == null ? null : String(request.phone),
      name: request.name == null ? null : String(request.name),
      email: request.email == null ? null : String(request.email),
    });
  }
}
