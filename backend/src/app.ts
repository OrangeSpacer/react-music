import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";
import routes from "./common/routes";

export class App {
	private port: number;
	private app: Express;

	constructor(private readonly logger: LoggerService) {
		this.port = 5000;
		this.app = express();
	}

	private useRoutes() {
		this.app.use("/api", routes);
	}

	public init() {
		this.app.use(express.json());
		this.app.listen(this.port);
		this.useRoutes();
		this.logger.info(`[App] Сервер работает на htpp://127.0.0.1:${this.port}`);
	}
}
