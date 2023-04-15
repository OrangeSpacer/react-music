import { hash } from "bcrypt";
import { User } from "../../models/User";
import { IUserService } from "./user.interface";
import { ITokenService } from "../token/token.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserDto } from "../../dtos/user.dto";
import { compare } from "bcrypt";
import { Token } from "../../models/Token";
import { ApiError } from "../../exceptions/api.error";
import { Role } from "../../models/Role";
import { ITrack } from "../track/track.interface";
import { PlayList } from "../../models/PlayList";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.TokenService) private tokenService: ITokenService,
		@inject(TYPES.TrackService) private trackService: ITrack,
	) {}

	private checkEmapty(item: any, message: string): void {
		if (item) {
			throw ApiError.badRequset(message);
		}
	}
	public async registration(password: string, email: string): Promise<object> {
		const candidate = await User.findOne({ email });
		this.checkEmapty(candidate, "Пользователь с таким email уже существует");
		const userRole: { type: string } | null = await Role.findOne({ type: "USER" });
		const hashPassword = await hash(password, 7);
		const user: any = await User.create({ email, password: hashPassword, roles: [userRole?.type] });

		const userDtoCreate = new UserDto(user);
		const token: any = this.tokenService.generateToken({ ...userDtoCreate });
		await this.tokenService.saveToken(userDtoCreate.id, token);
		return { token, user: userDtoCreate };
	}

	public async login(email: string, password: string): Promise<object> {
		const possibleUser: any = await User.findOne({ email });
		this.checkEmapty(!possibleUser, "Пользователь с таким email не найден");

		const unhashPassword = await compare(password, possibleUser.password);
		this.checkEmapty(!unhashPassword, "Пароль неверен");

		const userDto = new UserDto(possibleUser);

		const token: any = this.tokenService.generateToken({
			...userDto,
		});
		await this.tokenService.saveToken(possibleUser._id, token);
		return { token, user: userDto };
	}

	public async logout(refreshToken: string): Promise<object> {
		const token = await Token.deleteOne({ refreshToken });
		return token;
	}

	public async refresh(refreshToken: string): Promise<object> {
		if (!refreshToken) {
			throw ApiError.UnathorizedError();
		}
		const userData: any = this.tokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await this.tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDB) {
			throw ApiError.UnathorizedError();
		}
		const user: any = await User.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = this.tokenService.generateToken({ ...userDto });

		return { tokens, userDto };
	}

	public async getInfo(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnathorizedError();
		}
		const { refreshToken: token }: any = await this.tokenService.findToken(refreshToken);
		const userData = await this.tokenService.validateRefreshToken(token);
		return userData;
	}

	public async getFavoritesTracKs(userId: string) {
		const userTracks = await User.findById(userId);
		return userTracks?.favoritesTrack;
	}

	public async addFavoritesTracK(trackId: string, userId: string) {
		const { _id }: any = await this.trackService.getForId(trackId);
		const user = await User.findById(userId);
		if (user?.favoritesTrack.indexOf(_id) != -1) {
			throw ApiError.badRequset("Этот трек уже добавлен в любимые");
		}
		user?.favoritesTrack.push(_id);
		await user?.save();
		return user;
	}

	public async deleteFavoritesTrack(trackId: string, userId: string) {
		const track: any = await this.trackService.getForId(trackId);
		console.log(track);
		const user = await User.findById(userId);
		const index = user?.favoritesTrack.findIndex((item) => item.toString() == track._id);
		if (index == -1 || index == undefined) {
			throw ApiError.badRequset("Не удалось найти трек");
		} else {
			user?.favoritesTrack.splice(index, 1);
			await user?.save();
			return user;
		}
	}

	public async addPlaylist(playlistId: string, userId: string) {
		const playlist = await PlayList.findById(playlistId);
		const user = await User.findById(userId);
		user?.playLists.push(playlist);
		await user?.save();
		return user;
	}

	public async deletePlaylist(playlistId: string, userId: string) {
		const playlist: any = await PlayList.findById(playlistId);
		const user = await User.findById(userId);
		const index = user?.playLists.findIndex((item) => item._id == playlist._id);
		if (index == -1 || index == undefined) {
			ApiError.badRequset("Не удалось найти плейлист");
		} else {
			user?.playLists.splice(index, 1);
			await user?.save();
			return user;
		}
	}
}
