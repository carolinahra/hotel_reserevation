import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class ExtraServiceAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Extra Service Already Exists');
}
}