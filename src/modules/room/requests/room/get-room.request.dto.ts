import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidName,
  isValidLimit,
  isValidOffset,
} from "@shared/validation-functions";

export interface GetRoomRequest {
  id?: unknown;
  name?: unknown;
  sizeId?: unknown;
  limit?: unknown;
  offset?: unknown;
}

function validate(request: GetRoomRequest): void {
  if (request.id && !isValidId(request.id)) {
    throw new InvalidRequestException();
  }
  if (request.sizeId && !isValidId(request.sizeId)) {
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

export class GetRoomRequestDTO {
  id?: number;
  name?: string;
  sizeId?: number;
  limit?: number;
  offset?: number;
  constructor(getRoomRequest: {
    id?: number;
    name?: string;
    sizeId?: number;
    limit?: number;
    offset?: number;
  }) {
    this.id = getRoomRequest.id;
    this.name = getRoomRequest.name;
    this.limit = getRoomRequest.limit;
    this.offset = getRoomRequest.offset;
  }

  public static fromRequest(request: GetRoomRequest): GetRoomRequestDTO {
    validate(request);
    return new GetRoomRequestDTO({
      id: request.id == null ? null : Number(request.id),
      name: request.name == null ? null : String(request.name),
      sizeId: request.sizeId == null ? null : Number(request.sizeId),
      limit: request.limit == null ? null : Number(request.limit),
      offset: request.offset == null ? null : Number(request.offset),
    });
  }
  u;
}
