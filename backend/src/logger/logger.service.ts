import { inject, injectable } from "inversify";
import { ILogger } from "./logger.interface";
import { ILogObj, Logger } from "tslog";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
	private logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger();
	}

	public info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}
