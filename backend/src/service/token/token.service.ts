import Jwt from "jsonwebtoken";
import { Token } from "../../models/Token";
import { ITokenService } from "./token.interface";
import { inject, injectable } from "inversify";
import { Repository } from "../../repository/repository";
import { TYPES } from "../../types";

@injectable()
export class TokenService implements ITokenService {
	constructor(@inject(TYPES.Repository) private repository: Repository) {}
	public generateToken(payload: string | object): Object {
		const accessToken = Jwt.sign(payload, process.env.SECRET_ACCESS as string, {
			expiresIn: "30m",
		});
		const refreshToken = Jwt.sign(payload, process.env.SECRET_REFRESH as string, {
			expiresIn: "30d",
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	public async saveToken(userId: string, tokens: { refreshToken: string }): Promise<object> {
		const tokenData = await this.repository.token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = tokens.refreshToken;
			return tokenData.save();
		}
		const token = await this.repository.token.create({
			refreshToken: tokens.refreshToken,
			user: userId,
		});
		return token;
	}

	public async removeToken(refreshToken: string): Promise<object> {
		const tokenData = await this.repository.token.deleteOne({ refreshToken });
		return tokenData;
	}

	public async findToken(refreshToken: string): Promise<object | null> {
		const tokenData = await this.repository.token.findOne({ refreshToken });
		return tokenData;
	}

	public validateAccessToken(token: string): string | Jwt.JwtPayload | null {
		try {
			const userData: string | Jwt.JwtPayload = Jwt.verify(token, process.env.SECRET_ACCESS as string);
			return userData;
		} catch (e) {
			return null;
		}
	}

	public validateRefreshToken(token: string): string | Jwt.JwtPayload | null {
		try {
			const userData: string | Jwt.JwtPayload = Jwt.verify(
				token,
				process.env.SECRET_REFRESH as string,
			);
			return userData;
		} catch (e) {
			return null;
		}
	}
}
