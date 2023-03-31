export interface IUserService {
	registration: (password: string, email: string) => void;
	login: (email: string, password: string) => void;
	logout: (refreshToken: string) => void;
	refresh: (refreshToken: string) => void;
}
