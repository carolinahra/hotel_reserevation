import { Exception } from "./exception";

export class AlreadyExistsException extends Exception {
    code = 409;
}