import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface INotification
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	message: string;
	type: "success" | "warn" | "error";
}
