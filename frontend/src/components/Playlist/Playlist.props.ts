import { DetailedHTMLProps, HTMLAttributes,  } from "react";

export interface IPlaylistProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    title: string,
    tracksLength: number
    id: string
}