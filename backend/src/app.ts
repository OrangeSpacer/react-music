import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";
import routes from "./common/routes";
import { DatabaseService } from "./database/db.service";
import { DotenvConfigOutput, config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class App {
	private port: number;
	private app: Express;
	private config: DotenvConfigOutput;

	constructor(
		@inject("Logger") private logger: LoggerService,
		@inject("Database") private database: DatabaseService,
	) {
		this.port = 5000;
		this.app = express();
		this.config = config();
	}

	private useConfig(): void {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(cookieParser());
		this.config;
	}

	private useRoutes(): void {
		this.app.use("/api", routes);
	}

	public async init(): Promise<void> {
		this.app.listen(this.port);
		this.logger.info(`[App] Сервер работает на htpp://127.0.0.1:${this.port}`);
		await this.database.connect();
		this.useConfig();
		this.useRoutes();
	}
}
