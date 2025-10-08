import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,
  isValidString,
} from "@shared/validation-functions";

export interface InsertRoomSizeRequest {
  name: unknown;
  size: unknown;
}

function validate(request: InsertRoomSizeRequest): void {
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.size && !isValidString(request.size)) {
    throw new InvalidRequestException();
  }

}

export class InsertRoomSizeRequestDTO {
  name: string;
  size: string;
  constructor(InsertRoomSizeRequest: {
    name: string;
    size: string;
  }) {
    this.name = InsertRoomSizeRequest.name;
    this.size = InsertRoomSizeRequest.size;
  }

  public static fromRequest(request: InsertRoomSizeRequest): InsertRoomSizeRequestDTO {
    validate(request);
    return new InsertRoomSizeRequestDTO({
      name: request.name == null ? null : String(request.name),
      size: request.size == null ? null : String(request.size),
    });
  }
}
