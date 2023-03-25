import { Schema, SchemaOptions, model } from "mongoose";

const UserScheme = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export const User = model("User", UserScheme);
