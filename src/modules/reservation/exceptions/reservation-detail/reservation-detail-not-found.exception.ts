import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class ReservationDetailNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Reservation Detail Not Found');
    }
}