import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class ReservationAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Reservation Already Exists');
}
}