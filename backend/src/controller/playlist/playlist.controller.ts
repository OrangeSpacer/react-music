import { Request, Response, NextFunction } from "express";
import { IPlaylistController } from "./playlist.interface";
import { Routes } from "../../route/routes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { PlaylistService } from "../../service/playlist/playlist.service";

@injectable()
export class PlaylistController extends Routes implements IPlaylistController {
	constructor(@inject(TYPES.PlaylistService) private playlistService: PlaylistService) {
		super();
		this.createRoute([
			{
				path: "/playlist/all",
				method: "get",
				func: this.getAll,
			},
			{
				path: "/playlist/create",
				method: "post",
				func: this.createPlayList,
			},
			{
				path: "/playlist/add",
				method: "post",
				func: this.addTrack,
			},
			{
				path: "/playlist/delete",
				method: "delete",
				func: this.deletePlayList,
			},
			{
				path: "/playlist/remove",
				method: "delete",
				func: this.deleteTrack,
			},
		]);
	}
	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const playlists = await this.playlistService.getAll();
			res.json(playlists);
		} catch (e) {
			next(e);
		}
	}
	public async createPlayList(req: Request, res: Response, next: NextFunction) {
		try {
			const { title } = req.body;
			const playlist = await this.playlistService.createPlaylist(title);
			res.json(playlist);
		} catch (e) {
			next(e);
		}
	}
	public async addTrack(req: Request, res: Response, next: NextFunction) {
		try {
			const { idPlaylist, idTrack } = req.body;
			const addedTrack = await this.playlistService.addTrack(idPlaylist, idTrack);
			res.json(addedTrack);
		} catch (e) {
			next(e);
		}
	}
	public async deletePlayList(req: Request, res: Response, next: NextFunction) {
		const { id } = req.query;
		const deletedPlaylist = await this.playlistService.deletePlayList(id as string);
		res.json(deletedPlaylist);
	}
	public async deleteTrack(req: Request, res: Response, next: NextFunction) {
		const { idplaylist, idTrack } = req.query;
		const deletedTrack = await this.playlistService.deleteTrack(
			idplaylist as string,
			idTrack as string,
		);
		res.json(deletedTrack);
	}
}
