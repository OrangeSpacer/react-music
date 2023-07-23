import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IBurger extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	closeBurgerMenu?: () => void;
	listLink: { text: string; link: string; imgLink: string }[];
}
