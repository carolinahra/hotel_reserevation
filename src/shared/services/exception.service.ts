import { Exception } from "@shared/exceptions/exception";
import { LogService } from "./log.service";

interface ErrorResponse {
  httpCode: number;
  message: string;
}

export class ExceptionService {
  constructor(private readonly logService: LogService) {}
  handle(error: Error): ErrorResponse {
    this.logService.collect({ error: error });
    if (error instanceof Exception) {
      return {
        httpCode: error.code,
        message: error.message,
      };
    }
    return {
      httpCode: 500,
      message: error.message,
    };
  }
}
