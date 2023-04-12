import { NextFunction, Request, Response } from "express";

export interface IPlaylistController {
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	createPlayList: (req: Request, res: Response, next: NextFunction) => void;
	addTrack: (req: Request, res: Response, next: NextFunction) => void;
	deletePlayList: (req: Request, res: Response, next: NextFunction) => void;
	deleteTrack: (req: Request, res: Response, next: NextFunction) => void;
}
