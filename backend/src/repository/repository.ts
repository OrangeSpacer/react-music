import { injectable } from "inversify";
import { PlayList } from "../models/PlayList";
import { Token } from "../models/Token";
import { Track } from "../models/Track";
import { User } from "../models/User";

@injectable()
export class Repository {
	public user: typeof User;
	public token: typeof Token;
	public playlist: typeof PlayList;
	public track: typeof Track;

	constructor() {
		this.user = User;
		this.track = Track;
		this.playlist = PlayList;
		this.token = Token;
	}
}
