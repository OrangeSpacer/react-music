import { Schema, model } from "mongoose";

const trackSchema = new Schema({
	title: { type: String, required: true, unique: true },
	author: { type: String, required: true },
	image: { type: Buffer },
	track: { type: Buffer },
});

export const Track = model("Track", trackSchema);
