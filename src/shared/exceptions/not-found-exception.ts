import { Exception } from "./exception";

export class NotFoundException extends Exception {
  code = 404;

}
