import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class RoomAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Room Already Exists');
}
}