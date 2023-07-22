import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IButton
	extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	typeView: "circle" | "rounded";
	func?: () => void;
}
