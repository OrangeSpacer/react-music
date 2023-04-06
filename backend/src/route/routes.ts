import { Router } from "express";
import { inject, injectable } from "inversify";
import { IRoute } from "./route.interface";
import "reflect-metadata";

@injectable()
export class Routes {
	private _router: Router;
	constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public createRoute(routes: IRoute[]): void {
		for (const route of routes) {
			const middleware = route.middleware?.map((m) => m.exception.bind(this));
			const handler = route.func?.bind(this);
			const pipeline: any = middleware ? [...middleware, handler] : handler;
			this._router[route.method](route.path, pipeline);
		}
	}
}
