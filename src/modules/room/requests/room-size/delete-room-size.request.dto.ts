import { InvalidRequestException } from "@shared/exceptions/invalid-request.exception";
import {
  isValidName,

} from "@shared/validation-functions";

export interface DeleteRoomSizeRequest {
  name: unknown;
}

function validate(request: DeleteRoomSizeRequest): void {
  if (request.name && !isValidName(request.name)) {
    throw new InvalidRequestException();
  }
}

export class DeleteRoomSizeRequestDTO {
  name: string;

  constructor(DeleteRoomSizeRequest: { name: string }) {
    this.name = DeleteRoomSizeRequest.name;
  }

  public static fromRequest(request: DeleteRoomSizeRequest): DeleteRoomSizeRequestDTO {
    validate(request);
    return new DeleteRoomSizeRequestDTO({
      name: request.name == null ? null : String(request.name),
    });
  }
}
