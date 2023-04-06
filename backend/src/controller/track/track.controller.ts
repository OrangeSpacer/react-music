import { Request, Response, NextFunction } from "express";
import { ITrackController } from "./track.interface";
import { Routes } from "../../route/routes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TrackService } from "../../service/track/track.service";

@injectable()
export class TrackController extends Routes implements ITrackController {
	constructor(@inject(TYPES.TrackService) private trackService: TrackService) {
		super();
		this.createRoute([
			{
				path: "/allTrack",
				method: "get",
				func: this.getAll,
			},
			{
				path: "/addTrack",
				method: "post",
				func: this.add,
			},
			{
				path: "/deleteTrack",
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
		const { title, author } = req.body;
		const files: any = req.files;
		const trackInfo = files.reduce((acc: any, item: any) => {
			if (acc[item.fieldname]) {
				acc[item.fieldname] = item;
			}
			acc[item.fieldname] = item;
			return acc;
		});
		console.log(title, author, trackInfo);
		// const newTrack = await this.trackService.add(title, author, image, track);
		res.json({ message: "трек создан" });
	}
	delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction) {
		const { id } = req.body;
	}
}
