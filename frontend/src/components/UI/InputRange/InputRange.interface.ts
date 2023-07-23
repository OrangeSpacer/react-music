import { ChangeEvent } from "react";

export interface IInputRange {
	minValue: number;
	maxValue: number;
	onChnage: (e: ChangeEvent<HTMLInputElement>) => void;
}
