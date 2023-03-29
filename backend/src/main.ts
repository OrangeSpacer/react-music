import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { DatabaseService } from "./database/db.service";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { ITokenService } from "./service/token/token.interface";
import { TokenService } from "./service/token/toke.service";
import { ILogger } from "./logger/logger.interface";
import { IUserController } from "./controller/user/user.interface";
import { UserController } from "./controller/user/user.controller";
import { IUserService } from "./service/user/user.interface";
import { UserService } from "./service/user/user.service";

export interface IBootStrapReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	bind<DatabaseService>(TYPES.Database).to(DatabaseService).inSingletonScope();
	bind<ITokenService>(TYPES.TokenService).to(TokenService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootStrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

void bootstrap();
