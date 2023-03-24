import { App } from "./app";
import { DatabaseService } from "./database/db.service";
import { LoggerService } from "./logger/logger.service";

async function bootstrap(): Promise<void> {
	const app = new App(new LoggerService(), new DatabaseService(new LoggerService()));
	await app.init();
}

void bootstrap();
