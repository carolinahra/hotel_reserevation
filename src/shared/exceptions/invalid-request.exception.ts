import { Exception } from "./exception";

export class InvalidRequestException extends Exception {
    code = 400;
     constructor(message?: string) {
        super(message || 'Invalid request');
    }
}