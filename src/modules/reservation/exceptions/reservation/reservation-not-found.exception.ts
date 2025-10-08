import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class ReservationNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Reservation Not Found');
    }
}