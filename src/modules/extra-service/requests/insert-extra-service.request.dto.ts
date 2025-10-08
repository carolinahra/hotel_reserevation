import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,
  isValidPrice,
} from "@shared/validation-functions";
export interface InsertExtraServiceRequest {
  price: unknown;
  name: unknown;
}

function validate(request: InsertExtraServiceRequest): void {
  if (request.price && !isValidPrice(request.price)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
}

export class InsertExtraServiceRequestDTO {
  price: number;
  name: string;

  constructor(insertExtraServiceRequest: {
    price: number;
    name: string;
  }) {
    this.price = insertExtraServiceRequest.price;
    this.name = insertExtraServiceRequest.name;
  }

  public static fromRequest(
    request: InsertExtraServiceRequest
  ): InsertExtraServiceRequestDTO {
    validate(request);
    return new InsertExtraServiceRequestDTO({
      price: request.price == null ? null : Number(request.price),
      name: request.name == null ? null : String(request.name),
    });
  }
}
