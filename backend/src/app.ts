import express, { Express } from "express";
import { DatabaseService } from "./database/db.service";
import { DotenvConfigOutput, config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { ILogger } from "./logger/logger.interface";
import { UserController } from "./controller/user/user.controller";
import { ErrorMiddleware } from "./middleware/error.middleware";
import multer from "multer";
import { TrackController } from "./controller/track/track.controller";
import { ITrackController } from "./controller/track/track.interface";

@injectable()
export class App {
	private port: number;
	private app: Express;
	private config: DotenvConfigOutput;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.Database) private database: DatabaseService,
		@inject(TYPES.UserController) private userCOntroller: UserController,
		@inject(TYPES.TrackController) private trackController: TrackController,
		@inject(TYPES.ErrorMiddleWare) private errorMiddleware: ErrorMiddleware,
	) {
		this.port = 5000;
		this.app = express();
		this.config = config();
	}

	private useConfig(): void {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(cookieParser());
		this.app.use(multer().any());
		this.app.use(express.static(__dirname + "/static"));
		this.config;
	}

	private useRoutes(): void {
		this.app.use("/api", [this.userCOntroller.router, this.trackController.router]);
	}

	public async init(): Promise<void> {
		this.app.listen(this.port);
		this.logger.info(`[App] Сервер работает на htpp://127.0.0.1:${this.port}`);
		await this.database.connect();
		this.useConfig();
		this.useRoutes();
		this.app.use(this.errorMiddleware.exception);
	}
}
