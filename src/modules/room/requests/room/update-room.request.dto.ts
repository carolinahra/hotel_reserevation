import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidName,
  isValidLimit,
  isValidOffset,
  isValidString,
} from "@shared/validation-functions";

export interface UpdateRoomRequest {
  name: unknown;
  availability?: unknown;
  price?: unknown;
}

function validate(request: UpdateRoomRequest): void {
  if (request.availability && !isValidString(request.availability)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
}

export class UpdateRoomRequestDTO {
  name: string;
  availability?: string;
  price?: number;
  constructor(updateRoomRequest: {
    name: string;
    availability?: string;
    price?: number;
  }) {
    this.name = updateRoomRequest.name;
    this.availability = updateRoomRequest.availability;
    this.price = updateRoomRequest.price;
  }

  public static fromRequest(request: UpdateRoomRequest): UpdateRoomRequestDTO {
    validate(request);
    return new UpdateRoomRequestDTO({
      name: request.name == null ? null : String(request.name),
      availability:
        request.availability == null ? null : String(request.availability),
      price: request.price == null ? null : Number(request.price),
    });
  }
  u;
}
