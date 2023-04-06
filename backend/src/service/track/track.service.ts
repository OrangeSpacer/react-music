import { injectable } from "inversify";
import { ApiError } from "../../exceptions/api.error";
import { Track } from "../../models/Track";
import { ITrack } from "./track.interface";

@injectable()
export class TrackService implements ITrack {
	private errorChecker(item: any, message: string): void {
		if (item) {
			throw ApiError.badRequset(message);
		}
	}
	public async getAll(): Promise<object> {
		const tracks = await Track.find();
		return tracks;
	}

	public async add(title: string, author: string, image: Buffer, track: Buffer): Promise<object> {
		const candidateTrack = await Track.findOne({ title });
		this.errorChecker(candidateTrack, "Трек с таким названием уже существует");
		const trackData = await Track.create({ title, author, image, track });
		return trackData;
	}

	public async delete(id: string): Promise<object> {
		const deleteTrack = await Track.deleteOne({ id: id });
		return deleteTrack;
	}
}
