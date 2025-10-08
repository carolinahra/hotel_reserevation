import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,
  isValidString,
  isValidId,
  isValidPrice,
} from "@shared/validation-functions";

export interface InsertRoomRequest {
  name: unknown;
  sizeId: unknown;
  price: unknown;
  availability: unknown;
}

function validate(request: InsertRoomRequest): void {
  if (request.availability && !isValidString(request.availability)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.sizeId && !isValidId(request.sizeId)) {
    throw new InvalidRequestException();
  }
  if (request.price && !isValidPrice(request.price)) {
    throw new InvalidRequestException();
  }
}

export class InsertRoomRequestDTO {
  name: string;
  sizeId: number;
  price: number;
  availability: string;
  constructor(InsertRoomRequest: {
    name: string;
    sizeId: number;
    price: number;
    availability: string;
  }) {
    this.name = InsertRoomRequest.name;
    this.sizeId = InsertRoomRequest.sizeId;
    this.availability = InsertRoomRequest.availability;
    this.price = InsertRoomRequest.price;
  }

  public static fromRequest(request: InsertRoomRequest): InsertRoomRequestDTO {
    validate(request);
    return new InsertRoomRequestDTO({
      name: request.name == null ? null : String(request.name),
      sizeId: request.sizeId == null ? null : Number(request.sizeId),
      availability:
        request.availability == null ? null : String(request.availability),
      price: request.price == null ? null : Number(request.price),
    });
  }
}
