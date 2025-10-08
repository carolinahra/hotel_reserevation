import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import { isValidName, isValidPrice } from "@shared/validation-functions";
export interface UpdateExtraServiceRequest {
  price: unknown;
  name: unknown;
  newPrice: unknown;
}

function validate(request: UpdateExtraServiceRequest): void {
  if (request.price && !isValidPrice(request.price)) {
    throw new InvalidRequestException();
  }
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
  if (request.newPrice && !isValidPrice(request.newPrice)) {
    throw new InvalidRequestException();
  }
}

export class UpdateExtraServiceRequestDTO {
  price: number;
  name: string;
  newPrice: number;

  constructor(updateExtraServiceRequest: {
    price: number;
    name: string;
    newPrice: number;
  }) {
    this.price = updateExtraServiceRequest.price;
    this.name = updateExtraServiceRequest.name;
    this.newPrice = updateExtraServiceRequest.newPrice;
  }

  public static fromRequest(
    request: UpdateExtraServiceRequest
  ): UpdateExtraServiceRequestDTO {
    validate(request);
    return new UpdateExtraServiceRequestDTO({
      price: request.price == null ? null : Number(request.price),
      name: request.name == null ? null : String(request.name),
      newPrice: request.newPrice == null ? null : Number(request.newPrice),
    });
  }
}
