import { NextFunction, Request, Response } from "express";

export interface IFavoritesController {
	addFavoritesTracK: (req: Request, res: Response, next: NextFunction) => void;
	deleteFavoritesTrack: (req: Request, res: Response, next: NextFunction) => void;
	getFavoritesTracKs: (req: Request, res: Response, next: NextFunction) => void;
}
