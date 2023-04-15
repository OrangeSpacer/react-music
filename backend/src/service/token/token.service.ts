import Jwt from "jsonwebtoken";
import { Token } from "../../models/Token";
import { ITokenService } from "./token.interface";
import { injectable } from "inversify";

@injectable()
export class TokenService implements ITokenService {
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
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = tokens.refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({ refreshToken: tokens.refreshToken, user: userId });
		return token;
	}

	public async removeToken(refreshToken: string): Promise<object> {
		const tokenData = await Token.deleteOne({ refreshToken });
		return tokenData;
	}

	public async findToken(refreshToken: string): Promise<object | null> {
		const tokenData = await Token.findOne({ refreshToken });
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
