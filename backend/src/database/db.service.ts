import mongoose from "mongoose";
import { LoggerService } from "../logger/logger.service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class DatabaseService {
	constructor(@inject(TYPES.Logger) private logger: LoggerService) {}
	public async connect(): Promise<void> {
		try {
			await mongoose.connect(process.env.DB_URI as string);
			this.logger.info("[database] успешное подключение к базе данных");
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[database] не удалось подключиться к базе данных: ${e.message}`);
			} else if (typeof e == "string") {
				this.logger.error(`[database] не удалось подключиться к базе данных: ${e}`);
			}
		}
	}
}
