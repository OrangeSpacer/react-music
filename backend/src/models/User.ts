import { Mongoose, Schema, SchemaOptions, model } from "mongoose";

const UserScheme = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	favoritesTrack: { type: Array, default: [] },
	playLists: { type: Array, default: [] },
	roles: [{ type: String, ref: "Role" }],
});

export const User = model("User", UserScheme);
