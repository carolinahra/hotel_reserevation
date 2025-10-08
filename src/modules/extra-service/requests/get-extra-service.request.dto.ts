import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidId,
  isValidName,
  isValidLimit,
  isValidOffset,
  isValidPrice,
} from "@shared/validation-functions";
export interface GetExtraServiceRequest {
  id?: unknown;
  name?: unknown;
  price?: unknown;
  limit?: unknown;
  offset?: unknown;
}

function validate(request: GetExtraServiceRequest): void {
  if (request.id && !isValidId(request.id)) {
    throw new InvalidRequestException();
  }
  if (request.price && !isValidPrice(request.price)) {
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

export class GetExtraServiceRequestDTO {
  id?: number;
  name?: string;
  price?: number;
  limit?: number;
  offset?: number;

  constructor(getExtraServiceRequest: {
    id?: number;
    name?: string;
    price?: number;
    limit?: number;
    offset?: number;
  }) {
    this.id = getExtraServiceRequest.id;
    this.name = getExtraServiceRequest.name;
    this.price = getExtraServiceRequest.price;
    this.limit = getExtraServiceRequest.limit;
    this.offset = getExtraServiceRequest.offset;
  }

  public static fromRequest(request: GetExtraServiceRequest): GetExtraServiceRequestDTO {
    validate(request);
    return new GetExtraServiceRequestDTO({
      id: request.id == null ? null : Number(request.id),
      name: request.name == null ? null : String(request.name),
      price: request.price == null ? null : Number(request.price),
      limit: request.limit == null ? null : Number(request.limit),
      offset: request.offset == null ? null : Number(request.offset),
    });
  }
}
