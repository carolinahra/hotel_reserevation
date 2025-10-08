import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class RoomSizeAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Room Size Already Exists');
}
}