import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api.error";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ITokenService } from "../service/token/token.interface";

@injectable()
export class AuthMiddleware {
	constructor(@inject(TYPES.TokenService) private tokenService: ITokenService) {}
	public exception(req: Request, res: Response, next: NextFunction): void {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				return next(ApiError.UnathorizedError());
			}

			const accessToken = authorizationHeader.split(" ")[1];
			if (accessToken == "undefined") {
				return next(ApiError.UnathorizedError());
			}
			const userData = this.tokenService.validateAccessToken(accessToken);
			if (!userData) {
				return next(ApiError.UnathorizedError());
			}

			req.user = userData;
			next();
		} catch (e) {
			return next(ApiError.UnathorizedError());
		}
	}
}
