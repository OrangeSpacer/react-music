import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { DatabaseService } from "./database/db.service";
import { LoggerService } from "./logger/logger.service";

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerService>("Logger").to(LoggerService).inSingletonScope();
	bind<DatabaseService>("Database").to(DatabaseService).inSingletonScope();
	bind<App>("App").to(App);
});

async function bootstrap(): Promise<object> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>("App");
	await app.init();
	return { appContainer, app };
}

void bootstrap();
