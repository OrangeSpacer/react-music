import { Schema, SchemaOptions, model } from "mongoose";

const UserScheme = new Schema({
	username: { type: String, unique: true, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export const User = model("User", UserScheme);
