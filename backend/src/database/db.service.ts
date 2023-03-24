import mongoose from "mongoose";
import { LoggerService } from "../logger/logger.service";

export class DatabaseService {
	constructor(private logger: LoggerService) {}
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
