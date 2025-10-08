import { appendFile, mkdir } from "fs/promises";
import { Request } from "express";

interface LogData {
  timestamp?: string;
  request?: string;
  response?: string;
  error?: string;
  totalTime?: number;
  startTime?: number;
}

interface CollectParams {
  request?: Request;
  responseBody?: unknown;
  error?: Error;
}

export interface LogConfig {
  logPath: string;
}

export class LogService {
  constructor(private config: LogConfig, private logData: LogData) {}
  public start() {
    const start = Date.now();
    this.logData.startTime = start;
    this.logData.timestamp = Date();
  }

  public collect(collectParams: CollectParams) {
    if (collectParams.request) {
      const requestData = [
        `${collectParams.request.method} ${collectParams.request.originalUrl}`,
        `Query: ${JSON.stringify(collectParams.request.query)}`,
        `Body: ${JSON.stringify(collectParams.request.body)}`,
      ].join(" | ");
      this.logData.request = requestData;
    }
    if (collectParams.error) {
      this.logData.error = collectParams.error.toString();
    }

    if (collectParams.responseBody != undefined) {
      if (typeof collectParams.responseBody === "string") {
        this.logData.response = collectParams.responseBody;
      }
      if (typeof collectParams.responseBody === "object") {
        this.logData.response = JSON.stringify(collectParams.responseBody);
      }
      this.logData.response = String(collectParams.responseBody);
    }
  }

  public log() {
    const end = Date.now();
    this.logData.totalTime = end - this.logData.startTime;
    const log = JSON.stringify(this.logData) + "\n";

    appendFile(this.config.logPath, log).catch((error) => {
      throw error;
    });
  }
}
