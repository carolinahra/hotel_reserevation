import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,

} from "@shared/validation-functions";

export interface DeleteRoomRequest {
  name: unknown;
}

function validate(request: DeleteRoomRequest): void {
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
}

export class DeleteRoomRequestDTO {
  name: string;

  constructor(DeleteRoomRequest: { name: string }) {
    this.name = DeleteRoomRequest.name;
  }

  public static fromRequest(request: DeleteRoomRequest): DeleteRoomRequestDTO {
    validate(request);
    return new DeleteRoomRequestDTO({
      name: request.name == null ? null : String(request.name),
    });
  }
}
