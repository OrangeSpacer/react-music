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
		]);
	}
	public async registration(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { email, password }: any = req.body;
		const userData = await this.userService.registration(password, email);
		return res.json(userData);
	}

	// public login(req: Request, res: Response, next: NextFunction) {}

	// public logout(req: Request, res: Response, next: NextFunction) {}

	// public refreshToken(req: Request, res: Response, next: NextFunction) {}
}
