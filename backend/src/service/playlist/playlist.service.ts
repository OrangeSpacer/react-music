import { inject, injectable } from "inversify";
import { ApiError } from "../../exceptions/api.error";
import { IPlaylisrService } from "./playlist.interface";
import { TYPES } from "../../types";
import { Repository } from "../../repository/repository";

@injectable()
export class PlaylistService implements IPlaylisrService {
	constructor(@inject(TYPES.Repository) private repository: Repository) {}
	private check(itemCheck: any, message: string): void {
		if (itemCheck) {
			throw ApiError.badRequset(message);
		}
	}
	public async getAll(): Promise<object> {
		const playlists = await this.repository.playlist.find();
		return playlists;
	}

	public async getForId(playlistId: string): Promise<Object | null> {
		const playlist = await this.repository.playlist.findById(playlistId);
		return playlist;
	}

	public async getLocalPlaylist(authorId: string): Promise<object> {
		const playlists = await this.repository.playlist.find();
		const localPlaylist = playlists.filter(
			(playlist: { author: string }) => playlist.author == authorId,
		);
		return localPlaylist;
	}

	public async createPlaylist(title: string, author: string): Promise<object> {
		const candidatePlaylist = await this.repository.playlist.findOne({ title });
		this.check(candidatePlaylist, "Плейлист с таким названием уже существует");
		const playList = await this.repository.playlist.create({ title, author, tracks: [] });
		return playList;
	}
	public async deletePlayList(id: string, authorPlaylist: string): Promise<string> {
		const candidateDeletePlaylist: any = await this.repository.playlist.findOne({ _id: id });
		if (candidateDeletePlaylist.author != authorPlaylist) {
			throw ApiError.badRequset("У вас нет прав для выполнения данного действия");
		}
		this.check(!candidateDeletePlaylist, "Не удалось найти плейлист");
		await this.repository.playlist.deleteOne({ _id: id });
		return "Плейлист успешно удален";
	}
	public async addTrack(
		idPlaylist: string,
		idTrack: string,
		authorPlaylist: string,
	): Promise<object | null> {
		const candidateTrack = await this.repository.track.findOne({ _id: idTrack });
		this.check(!candidateTrack, "Не удалось найти трек");
		const candidatePlaylist = await this.repository.playlist.findOne({ _id: idPlaylist });
		if (candidatePlaylist?.author != authorPlaylist) {
			throw ApiError.badRequset("У вас нет прав для выполнения данного действия");
		}
		this.check(!candidatePlaylist, "Не удалось найти плейлист");
		if (
			candidatePlaylist?.tracks.indexOf((track: any) => track.title != candidateTrack?.title) != -1
		) {
			throw ApiError.badRequset("Данный трек уже добавлен");
		}
		candidatePlaylist?.tracks.push(candidateTrack);
		candidatePlaylist.save(candidatePlaylist as object);
		return candidatePlaylist;
	}
	public async deleteTrack(
		idPlaylist: string,
		idTrack: string,
		authorPlaylist: string,
	): Promise<string | null> {
		const candidateTrack = await this.repository.track.findOne({ _id: idTrack });
		this.check(!candidateTrack, "Не удалось найти трек");
		const candidatePlaylist = await this.repository.playlist.findOne({ _id: idPlaylist });
		if (candidatePlaylist?.author != authorPlaylist) {
			throw ApiError.badRequset("У вас нет прав для выполнения данного действия");
		}
		this.check(!candidatePlaylist, "Не удалось найти плейлист");
		const trackIndex = candidatePlaylist?.tracks.indexOf(
			(track: any) => track.title != candidateTrack?.title,
		);
		if (!trackIndex) {
			throw ApiError.badRequset("Данный трек отсутствует");
		}
		candidatePlaylist?.tracks.splice(trackIndex, 1);
		candidatePlaylist.save(candidatePlaylist as object);
		return "Трек успешно удален";
	}
}
