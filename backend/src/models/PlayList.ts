import { Schema, model } from "mongoose";

const playListScheme = new Schema({
	title: { type: String, required: true, unique: true },
	tracks: { type: Array },
});

export const PlayList = model("PlayList", playListScheme);
