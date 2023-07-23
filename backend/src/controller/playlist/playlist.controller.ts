import { Request, Response, NextFunction } from "express";
import { IPlaylistController } from "./playlist.interface";
import { Routes } from "../../route/routes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { PlaylistService } from "../../service/playlist/playlist.service";
import { IUserService } from "../../service/user/user.interface";
@injectable()
export class PlaylistController extends Routes implements IPlaylistController {
	constructor(
		@inject(TYPES.PlaylistService) private playlistService: PlaylistService,
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
				path: "/get",
				method: "post",
				func: this.getForId,
			},
			{
				path: "/your",
				method: "get",
				func: this.getLocalPlaylist,
			},
			{
				path: "/create",
				method: "post",
				func: this.createPlayList,
			},
			{
				path: "/add",
				method: "post",
				func: this.addTrack,
			},
			{
				path: "/delete",
				method: "delete",
				func: this.deletePlayList,
			},
			{
				path: "/remove",
				method: "delete",
				func: this.deleteTrack,
			},
		]);
	}
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const playlists = await this.playlistService.getAll();
			res.json(playlists);
		} catch (e) {
			next(e);
		}
	}
	public async getForId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id }: any = req.query;
			const playlist = await this.playlistService.getForId(id);
			res.json(playlist);
		} catch (e) {
			next(e);
		}
	}

	public async getLocalPlaylist(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const playlists = await this.playlistService.getLocalPlaylist(id);
			res.json(playlists);
		} catch (e) {
			next(e);
		}
	}

	public async createPlayList(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { title } = req.body;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const playlist = await this.playlistService.createPlaylist(title, id);
			res.json(playlist);
		} catch (e) {
			next(e);
		}
	}
	public async addTrack(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { idPlaylist, idTrack } = req.body;
			const { id }: any = await this.userService.getInfo(refreshToken);
			const addedTrack = await this.playlistService.addTrack(idPlaylist, idTrack, id);
			res.json(addedTrack);
		} catch (e) {
			next(e);
		}
	}

	public async deletePlayList(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const { id } = req.query;
			const { id: idForToken }: any = await this.userService.getInfo(refreshToken);
			const deletedPlaylist = await this.playlistService.deletePlayList(id as string, idForToken);
			res.json(deletedPlaylist);
		} catch (e) {
			next(e);
		}
	}

	public async deleteTrack(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { refreshToken } = req.cookies;
		const { idPlaylist, idTrack } = req.query;
		const { id }: any = await this.userService.getInfo(refreshToken);
		const deletedTrack = await this.playlistService.deleteTrack(
			idPlaylist as string,
			idTrack as string,
			id,
		);
		res.json(deletedTrack);
	}
}
