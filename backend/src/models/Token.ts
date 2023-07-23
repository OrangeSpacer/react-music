import { Schema, model } from "mongoose";

const tokenScheme = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, required: true },
});

export const Token = model("Token", tokenScheme);
