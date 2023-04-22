import { Mongoose } from "mongoose";
import { PlayList } from "../../models/PlayList";
import { IPlaylistRepository } from "./playlist.interface";
import { injectable } from "inversify";

@injectable()
export class PlaylistRepository implements IPlaylistRepository {
	public async create(object: any): Promise<any> {
		const playList = await PlayList.create(object);
		return playList;
	}
	public async find(): Promise<any> {
		const playlist = await PlayList.find();
		return playlist;
	}
	public async findById(id: string): Promise<any> {
		const playlist = await PlayList.findById(id);
		return playlist;
	}
	public async findOne(value: any): Promise<any> {
		const playlist = await PlayList.findOne(value);
		return playlist;
	}
	public async save(object: Mongoose): Promise<void> {
		await PlayList.updateOne(object);
	}

	public async deleteOne(value: any): Promise<any> {
		const playList = await PlayList.deleteOne(value);
		return playList;
	}
}
