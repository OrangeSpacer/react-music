import { NextFunction, Response, Request } from "express";

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	registration: (req: Request, res: any, next: NextFunction) => void;
	logout: (req: Request, res: Response, next: NextFunction) => void;
	getInfo: (req: Request, res: Response, next: NextFunction) => void;
	refreshToken: (req: Request, res: Response, next: NextFunction) => void;
	addPlaylist: (req: Request, res: Response, next: NextFunction) => void;
	deletePlaylist: (req: Request, res: Response, next: NextFunction) => void;
}
