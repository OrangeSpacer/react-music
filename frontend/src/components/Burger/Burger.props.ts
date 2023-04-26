import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IBurger extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    listLink: {text:string, link:string}[]
}