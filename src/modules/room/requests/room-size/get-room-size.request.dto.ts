import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidName,
  isValidLimit,
  isValidOffset,
} from "@shared/validation-functions";

export interface GetRoomSizeRequest {
  id?: unknown;
  name?: unknown;
  RoomSize?: unknown;
  limit?: unknown;
  offset?: unknown;
}

function validate(request: GetRoomSizeRequest): void {
  if (request.id && !isValidId(request.id)) {
    throw new InvalidRequestException();
  }
  if (request.RoomSize && !isValidId(request.RoomSize)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.limit && !isValidLimit(request.limit)) {
    throw new InvalidRequestException();
  }
  if (request.offset && !isValidOffset(request.offset)) {
    throw new InvalidRequestException();
  }
}

export class GetRoomSizeRequestDTO {
  id?: number;
  name?: string;
  RoomSize?: string;
  limit?: number;
  offset?: number;
  constructor(getRoomSizeRequest: {
    id?: number;
    name?: string;
    RoomSize?: string;
    limit?: number;
    offset?: number;
  }) {
    this.id = getRoomSizeRequest.id;
    this.name = getRoomSizeRequest.name;
    this.limit = getRoomSizeRequest.limit;
    this.offset = getRoomSizeRequest.offset;
  }

  public static fromRequest(request: GetRoomSizeRequest): GetRoomSizeRequestDTO {
    validate(request);
    return new GetRoomSizeRequestDTO({
      id: request.id == null ? null : Number(request.id),
      name: request.name == null ? null : String(request.name),
      RoomSize: request.RoomSize == null ? null : String(request.RoomSize),
      limit: request.limit == null ? null : Number(request.limit),
      offset: request.offset == null ? null : Number(request.offset),
    });
  }
  u;
}
