import { NextFunction, Response, Request } from "express";
import { IUserController } from "./user.interface";
import { IUserService } from "../../service/user/user.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Routes } from "../../common/routes";

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
		]);
	}
	public async registration(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { email, password }: any = req.body;
		const userData = await this.userService.registration(password, email);
		return res.json(userData);
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { email, password }: any = req.body;
		const userData: any = await this.userService.login(email, password);
		res.cookie("refreshToken", userData?.token?.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.json(userData);
	}

	public async logout(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { refreshToken } = req.cookies;
		const token = await this.userService.logout(refreshToken);
		res.clearCookie("refreshToken");
		return res.json(token);
	}

	public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { refreshToken } = req.cookies;
		const userData: any = await this.userService.refresh(refreshToken);
		res.cookie("refreshToken", userData.token.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.json(userData);
	}
}
