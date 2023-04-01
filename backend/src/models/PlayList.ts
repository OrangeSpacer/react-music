import { Schema } from "mongoose";

const playListScheme = new Schema({
	tracks: { type: Array, ref: "Track" },
});
