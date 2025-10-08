import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class GuestNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Guest Not Found');
    }
}