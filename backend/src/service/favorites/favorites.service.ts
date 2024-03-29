import { inject, injectable } from "inversify";
import { User } from "../../models/User";
import { IFavoritesService } from "./favorites.interface";
import { TYPES } from "../../types";
import { ITrack } from "../track/track.interface";
import { ApiError } from "../../exceptions/api.error";
import { Repository } from "../../repository/repository";

@injectable()
export class FavoritesService implements IFavoritesService {
	constructor(
		@inject(TYPES.TrackService) private trackService: ITrack,
		@inject(TYPES.Repository) private repository: Repository,
	) {}
	public async getFavoritesTracKs(userId: string): Promise<Object | null> {
		const userTracks: any = await this.repository.user.findById(userId);
		return userTracks?.favoritesTrack;
	}

	public async addFavoritesTracK(trackId: string, userId: string): Promise<Object | null> {
		const track: any = await this.trackService.getForId(trackId);
		const user = await this.repository.user.findById(userId);
		if (user?.favoritesTrack.findIndex((item) => item._id == track._id) != -1) {
			throw ApiError.badRequset("Этот трек уже добавлен в любимые");
		}
		user?.favoritesTrack.push(track);
		await user?.save();
		return user;
	}

	public async deleteFavoritesTrack(trackId: string, userId: string): Promise<Object | null> {
		const track: any = await this.trackService.getForId(trackId);
		const user = await this.repository.user.findById(userId);
		const index = user?.favoritesTrack.findIndex((item) => item._id == track._id.toString());
		if (index == -1 || index == undefined) {
			throw ApiError.badRequset("Не удалось найти трек");
		} else {
			user?.favoritesTrack.splice(index, 1);
			await user?.save();
			return user;
		}
	}
}
