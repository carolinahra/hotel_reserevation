import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class RoomSizeNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Room Size Not Found');
    }
}