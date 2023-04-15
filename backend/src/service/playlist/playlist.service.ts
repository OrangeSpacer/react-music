import { injectable } from "inversify";
import { ApiError } from "../../exceptions/api.error";
import { PlayList } from "../../models/PlayList";
import { Track } from "../../models/Track";
import { IPlaylisrService } from "./playlist.interface";

@injectable()
export class PlaylistService implements IPlaylisrService {
	private check(itemCheck: any, message: string): void {
		if (itemCheck) {
			throw ApiError.badRequset(message);
		}
	}
	public async getAll(): Promise<object> {
		const playlists = await PlayList.find();
		return playlists;
	}

	public async getForId(playlistId: string): Promise<Object | null> {
		const playlist = await PlayList.findById(playlistId);
		return playlist;
	}
	public async createPlaylist(title: string): Promise<object> {
		const candidatePlaylist = await PlayList.findOne({ title });
		this.check(candidatePlaylist, "Плейлист с таким названием уже существует");
		const playList = await PlayList.create({ title, tracks: [] });
		return playList;
	}
	public async deletePlayList(id: string): Promise<string> {
		const candidateDeletePlaylist = await PlayList.find({ _id: id });
		this.check(!candidateDeletePlaylist, "Не удалось найти плейлист");
		await PlayList.deleteOne({ _id: id });
		return "Плейлист успешно удален";
	}
	public async addTrack(idPlaylist: string, idTrack: string): Promise<object | null> {
		const candidateTrack = await Track.findOne({ _id: idTrack });
		console.log(candidateTrack);
		this.check(!candidateTrack, "Не удалось найти трек");
		const candidatePlaylist = await PlayList.findOne({ _id: idPlaylist });
		console.log(
			candidatePlaylist?.tracks.indexOf((track: any) => track.title == candidateTrack?.title),
		);
		this.check(!candidatePlaylist, "Не удалось найти плейлист");
		if (
			candidatePlaylist?.tracks.indexOf((track: any) => track.title != candidateTrack?.title) != -1
		) {
			throw ApiError.badRequset("Данный трек уже добавлен");
		}
		candidatePlaylist?.tracks.push(candidateTrack);
		candidatePlaylist?.save();
		return candidatePlaylist;
	}
	public async deleteTrack(idPlaylist: string, idTrack: string): Promise<string | null> {
		const candidateTrack = await Track.findOne({ _id: idTrack });
		this.check(!candidateTrack, "Не удалось найти трек");
		const candidatePlaylist = await PlayList.findOne({ _id: idPlaylist });
		this.check(!candidatePlaylist, "Не удалось найти плейлист");
		const trackIndex = candidatePlaylist?.tracks.indexOf(
			(track: any) => track.title != candidateTrack?.title,
		);
		if (!trackIndex) {
			throw ApiError.badRequset("Данный отсутствует");
		}
		candidatePlaylist?.tracks.splice(trackIndex, 1);
		candidatePlaylist?.save();
		return "Трек успешно удален";
	}
}
