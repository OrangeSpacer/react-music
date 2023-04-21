import { inject, injectable } from "inversify";
import { ApiError } from "../../exceptions/api.error";
import { Track } from "../../models/Track";
import { ITrack } from "./track.interface";
import { FileService } from "../file/file.service";
import { TYPES } from "../../types";
import { TYPE_FILE } from "../file/file.interface";

@injectable()
export class TrackService implements ITrack {
	constructor(@inject(TYPES.FileService) private fileService: FileService) {}
	private errorChecker(item: any, message: string): void {
		if (item) {
			throw ApiError.badRequset(message);
		}
	}
	public async getAll(): Promise<object> {
		const tracks = await Track.find();
		return tracks;
	}

	public async getForId(id: string): Promise<Object | null> {
		const track = await Track.findById(id);
		return track;
	}

	public async getLocalTrack(creatorId: string) {
		const tracks = await Track.find();
		const localTracks = tracks.filter((track) => track.creator == creatorId);
		return localTracks;
	}

	public async add(
		title: string,
		author: string,
		image: any,
		track: any,
		creator: string,
	): Promise<object> {
		const candidateTrack = await Track.findOne({ title });
		this.errorChecker(candidateTrack, "Трек с таким названием уже существует");
		const trackPath = this.fileService.createFile(track, TYPE_FILE.AUDIO);
		const imagePath = this.fileService.createFile(image, TYPE_FILE.IMAGE);
		const trackData = await Track.create({ title, author, creator, imagePath, trackPath });
		console.log(trackData);
		return trackData;
	}

	public async delete(id: string, author: string): Promise<string> {
		const deleteCandidateTrack = await Track.findById(id);
		console.log(author);
		if (deleteCandidateTrack?.creator != author) {
			throw ApiError.badRequset("У вас нет прав для выполнения данного действия");
		}
		if (!deleteCandidateTrack) {
			throw ApiError.badRequset("Не удалось найти трек");
		}
		this.fileService.deleteFIle(deleteCandidateTrack?.imagePath as string);
		this.fileService.deleteFIle(deleteCandidateTrack?.trackPath as string);
		await Track.deleteOne({ _id: id });
		return "трек успешно удален";
	}
}
