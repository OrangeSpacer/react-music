import { NextFunction, Response, Request } from "express";
import { IUserController } from "./user.interface";
import { IUserService } from "../../service/user/user.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Routes } from "../../route/routes";
import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/api.error";
import { RoleAdminMiddleware } from "../../middleware/roleAdmin.middleware";

@injectable()
export class UserController extends Routes implements IUserController {
	constructor(@inject(TYPES.UserService) private userService: IUserService) {
		super();
		this.createRoute([
			{
				path: "/registration",
				func: this.registration,
				method: "post",
			},
			{
				path: "/login",
				method: "post",
				func: this.login,
			},
			{
				path: "/logout",
				method: "post",
				func: this.logout,
			},
			{
				path: "/refresh",
				method: "get",
				func: this.refreshToken,
			},
			{
				path: "/createRole",
				method: "get",
				middleware: [new RoleAdminMiddleware()],
				func: this.createRole,
			},
		]);
	}

	public async registration(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<object | unknown> {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return next(ApiError.badRequset("ошибка при валидации", error.array()));
			}
			const { email, password }: any = req.body;
			const userData = await this.userService.registration(password, email);
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<object | unknown> {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return next(ApiError.badRequset("ошибка при валидации", error.array()));
			}
			const { email, password }: any = req.body;
			const userData: any = await this.userService.login(email, password);
			res.cookie("refreshToken", userData?.token?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	public async logout(req: Request, res: Response, next: NextFunction): Promise<object | unknown> {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return next(ApiError.badRequset("ошибка при валидации", error.array()));
			}
			const { refreshToken } = req.cookies;
			const token = await this.userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	public async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<object | unknown> {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return next(ApiError.badRequset("ошибка при валидации", error.array()));
			}
			const { refreshToken } = req.cookies;
			const userData: any = await this.userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	public async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// const user = new Role();
			// const admin = new Role({ type: "ADMIN" });
			// await user.save();
			// await admin.save();
			res.json({ message: "роль создана" });
		} catch (e) {
			next(e);
		}
	}
}
