import { ChangeEvent } from "react";

export interface ITrackProgress {
	minValue: number;
	maxValue: number;
	currentTime?: string;
	allTime?: string;
	onChnage: (e: ChangeEvent<HTMLInputElement>) => void;
}
