import { NextFunction, Request, Response } from "express";
import { IFavoritesController } from "./favorites.interface";
import { Routes } from "../../route/routes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IUserService } from "../../service/user/user.interface";
import { IFavoritesService } from "../../service/favorites/favorites.interface";

@injectable()
export class FavoritesController extends Routes implements IFavoritesController {
	constructor(
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.FavoritesService) private favoritesService: IFavoritesService,
	) {
		super();
		this.createRoute([
			{
				path: "/add",
				method: "post",
				func: this.addFavoritesTracK,
			},
			{
				path: "/remove",
				method: "post",
				func: this.deleteFavoritesTrack,
			},
			{
				path: "/all",
				method: "get",
				func: this.getFavoritesTracKs,
			},
		]);
	}

	public async addFavoritesTracK(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const { trackId } = req.body;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const favoritesTrack = await this.favoritesService.addFavoritesTracK(trackId, id);
			res.json(favoritesTrack);
		} catch (e) {
			next(e);
		}
	}

	public async deleteFavoritesTrack(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const { trackId } = req.body;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const deletedTrack = await this.favoritesService.deleteFavoritesTrack(trackId, id);
			res.json(deletedTrack);
		} catch (e) {
			next(e);
		}
	}

	public async getFavoritesTracKs(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const tracks = await this.favoritesService.getFavoritesTracKs(id);
			res.json(tracks);
		} catch (e) {
			next(e);
		}
	}
}
