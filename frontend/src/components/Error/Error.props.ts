import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IError extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    message: string
}