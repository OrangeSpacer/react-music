import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";
import routes from "./common/routes";
import { DatabaseService } from "./database/db.service";
import { DotenvConfigOutput, config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

export class App {
	private port: number;
	private app: Express;
	private config: DotenvConfigOutput;

	constructor(private readonly logger: LoggerService, private databse: DatabaseService) {
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
		await this.databse.connect();
		this.useConfig();
		this.useRoutes();
	}
}
