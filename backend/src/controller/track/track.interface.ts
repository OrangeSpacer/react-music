import { NextFunction, Request, Response } from "express";

export interface ITrackController {
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	add: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
}
