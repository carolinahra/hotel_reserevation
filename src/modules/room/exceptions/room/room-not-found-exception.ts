import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class RoomNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Room Not Found');
    }
}