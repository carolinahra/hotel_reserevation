import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class GuestAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Guest Already Exists');
}
}