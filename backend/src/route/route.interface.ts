import { NextFunction, Router, Response, Request } from "express";

export interface IRoute {
	path: string;
	method: keyof Pick<Router, "get" | "post" | "delete" | "put">;
	middleware?: any[];
	func?: (req: Request, res: Response, next: NextFunction) => any;
}
