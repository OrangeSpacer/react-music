import { NextFunction, Response, Request } from "express";
import { IUserController } from "./user.interface";
import { IUserService } from "../../service/user/user.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Routes } from "../../route/routes";
import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/api.error";

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
				path: "/info",
				method: "get",
				func: this.getInfo,
			},
			{
				path: "/playlist/add",
				method: "post",
				func: this.addPlaylist,
			},
			{
				path: "/playlist/remove",
				method: "delete",
				func: this.deletePlaylist,
			},
		]);
	}

	public async getInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { refreshToken } = req.cookies;
		const user = await this.userService.getInfo(refreshToken);
		res.json(user);
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
			const userData: any = await this.userService.registration(password, email);
			res.cookie("refreshToken", userData?.token?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
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
			console.log(userData);
			res.cookie("refreshToken", userData.token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	public async addPlaylist(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { playlistId } = req.body;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const playlist = await this.userService.addPlaylist(playlistId, id);
			res.json(playlist);
		} catch (e) {
			next(e);
		}
	}

	public async deletePlaylist(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { playlistId }: any = req.query;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const playlist = await this.userService.deletePlaylist(playlistId, id);
			res.json(playlist);
		} catch (e) {
			next(e);
		}
	}
}
