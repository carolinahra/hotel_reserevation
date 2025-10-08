import { AlreadyExistsException } from "@shared/exceptions/already-exists.exception";

export class ReservationDetailAlreadyExistsException extends AlreadyExistsException {
 constructor(message?: string) {
        super(message || 'Reservation Detail Already Exists');
}
}