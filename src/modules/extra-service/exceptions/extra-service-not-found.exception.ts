import { NotFoundException } from "@shared/exceptions/not-found-exception";

export class ExtraServiceNotFoundException extends NotFoundException {
     constructor(message?: string) {
        super(message || 'Extra Service Not Found');
    }
}