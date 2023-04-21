import { Request, Response, NextFunction } from "express";
import { ITrackController } from "./track.interface";
import { Routes } from "../../route/routes";
import { id, inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TrackService } from "../../service/track/track.service";
import { RoleAdminMiddleware } from "../../middleware/roleAdmin.middleware";
import { AllRoleMiddleware } from "../../middleware/allRole.middleware";
import { IUserService } from "../../service/user/user.interface";
// Добавить сервис и контроллер для получения треков пользователя
@injectable()
export class TrackController extends Routes implements ITrackController {
	constructor(
		@inject(TYPES.TrackService) private trackService: TrackService,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super();
		this.createRoute([
			{
				path: "/all",
				method: "get",
				func: this.getAll,
			},
			{
				path: "/add",
				method: "post",
				middleware: [new AllRoleMiddleware()],
				func: this.add,
			},
			{
				path: "/delete",
				method: "delete",
				middleware: [new AllRoleMiddleware()],
				func: this.delete,
			},
			{
				path: "/get",
				method: "post",
				middleware: [new AllRoleMiddleware()],
				func: this.getForId,
			},
			{
				path: "/your",
				method: "get",
				middleware: [new AllRoleMiddleware()],
				func: this.getLocalTrack,
			},
		]);
	}

	public async getAll(
		req: Request,
		res: Response<any, Record<string, any>>,
		next: NextFunction,
	): Promise<object | void> {
		try {
			const tracks = await this.trackService.getAll();
			res.json(tracks);
		} catch (e) {
			next(e);
		}
	}

	public async add(req: Request, res: Response, next: NextFunction): Promise<object | void> {
		try {
			const { refreshToken } = req.cookies;
			const { id: creator }: any = await this.userService.getInfo(refreshToken);
			const { title, author } = req.body;
			const files: any = req.files;
			const { track, image } = files.reduce((acc: any, item: any) => {
				acc[item.fieldname] = item;
				return acc;
			}, {});
			const newTrack = await this.trackService.add(title, author, image, track, creator);
			res.json(newTrack);
		} catch (e) {
			next(e);
		}
	}
	public async delete(
		req: Request,
		res: Response<any, Record<string, any>>,
		next: NextFunction,
	): Promise<object | void> {
		try {
			const { refreshToken } = req.cookies;
			const { id } = req.query;
			const { id: idForToken }: any = await this.userService.getInfo(refreshToken);
			const deleteTrack = await this.trackService.delete(id as string, idForToken);
			res.json(deleteTrack);
		} catch (e) {
			next(e);
		}
	}

	public async getForId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id }: any = req.query;
			const track = await this.trackService.getForId(id);
			res.json(track);
		} catch (e) {
			next(e);
		}
	}

	public async getLocalTrack(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const tracks = await this.trackService.getLocalTrack(id);
			res.json(tracks);
		} catch (e) {
			next(e);
		}
	}
}
