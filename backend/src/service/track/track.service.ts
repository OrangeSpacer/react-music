import { Track } from "../../models/Track";
import { ITrack } from "./track.interface";

export class TrackService implements ITrack {
	public async add(title: string, author: string, image: Buffer, track: Buffer): Promise<object> {
		const trackData = await Track.create({ title, author, image, track });
		return trackData;
	}

	public async delete(id: string): Promise<object> {
		const deleteTrack = await Track.deleteOne({ id: id });
		return deleteTrack;
	}
}
