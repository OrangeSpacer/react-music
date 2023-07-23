import Jwt from "jsonwebtoken";

export interface ITokenService {
	generateToken: (payload: string | object) => object;
	saveToken: (userId: string, token: { refreshToken: string }) => Promise<object>;
	removeToken: (refreshToken: string) => Promise<object>;
	findToken: (refreshToken: string) => Promise<object | null>;
	validateAccessToken: (token: string) => string | Jwt.JwtPayload | null;
	validateRefreshToken: (token: string) => string | Jwt.JwtPayload | null;
}
