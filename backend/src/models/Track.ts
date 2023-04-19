import { Schema, model } from "mongoose";

const trackSchema = new Schema({
	title: { type: String, required: true, unique: true },
	author: { type: String, required: true },
	creator: { type: String, required: true },
	imagePath: { type: String },
	trackPath: { type: String },
});

export const Track = model("Track", trackSchema);
