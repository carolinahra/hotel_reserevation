import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidName,
  isValidLimit,
  isValidOffset,
  isValidString,
} from "@shared/validation-functions";

export interface UpdateRoomSizeRequest {
  name: unknown;
  size?: unknown;
  newName?: unknown;
}

function validate(request: UpdateRoomSizeRequest): void {
  if (request.size && !isValidString(request.size)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.newName && !isValidName(request.newName)) {
    throw new InvalidRequestException();
  }
}

export class UpdateRoomSizeRequestDTO {
  name: string;
  size?: string;
  newName?: string;
  constructor(updateRoomSizeRequest: {
    name: string;
    size?: string;
    newName?: string;
  }) {
    this.name = updateRoomSizeRequest.name;
    this.size = updateRoomSizeRequest.size;
    this.newName = updateRoomSizeRequest.newName;
  }

  public static fromRequest(
    request: UpdateRoomSizeRequest
  ): UpdateRoomSizeRequestDTO {
    validate(request);
    return new UpdateRoomSizeRequestDTO({
      name: request.name == null ? null : String(request.name),
      size: request.size == null ? null : String(request.size),
      newName: request.newName == null ? null : String(request.newName),
    });
  }
  u;
}
