import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api.error";
import Jwt from "jsonwebtoken";

export class RoleAdminMiddleware {
	exception(req: Request, res: Response, next: NextFunction): void {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				return next(ApiError.UnathorizedError());
			}

			const accessToken = authorizationHeader.split(" ")[1];
			if (accessToken == "undefined") {
				return next(ApiError.UnathorizedError());
			}
			const userData: any = Jwt.verify(accessToken, process.env.SECRET_ACCESS as string);
			if (!userData) {
				return next(ApiError.UnathorizedError());
			}
			let hasRole = false;
			userData?.roles.forEach((role: string) => {
				if (role == "ADMIN") {
					hasRole = true;
				}
			});
			if (!hasRole) {
				return next(ApiError.badRequset("У вас недостаточно прав"));
			}
			next();
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequset("Что-то пошло не так", e));
		}
	}
}
