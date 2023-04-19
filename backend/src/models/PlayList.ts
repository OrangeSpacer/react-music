import { Schema, model } from "mongoose";

const playListScheme = new Schema({
	title: { type: String, required: true, unique: true },
	author: { type: String, required: true },
	tracks: { type: Array },
});

export const PlayList = model("PlayList", playListScheme);
