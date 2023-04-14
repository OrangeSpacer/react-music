import { Request, Response, NextFunction } from "express";
import { ITrackController } from "./track.interface";
import { Routes } from "../../route/routes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TrackService } from "../../service/track/track.service";
import { ApiError } from "../../exceptions/api.error";

@injectable()
export class TrackController extends Routes implements ITrackController {
	constructor(@inject(TYPES.TrackService) private trackService: TrackService) {
		super();
		this.createRoute([
			{
				path: "all",
				method: "get",
				func: this.getAll,
			},
			{
				path: "/add",
				method: "post",
				func: this.add,
			},
			{
				path: "/delete",
				method: "post",
				func: this.delete,
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
			const { title, author } = req.body;
			const files: any = req.files;
			const { track, image } = files.reduce((acc: any, item: any) => {
				acc[item.fieldname] = item;
				return acc;
			}, {});
			const newTrack = await this.trackService.add(title, author, image, track);
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
			const { id } = req.body;
			const deleteTrack = await this.trackService.delete(id);
			res.json(deleteTrack);
		} catch (e) {
			next(e);
		}
	}
}
