import { DetailedHTMLProps, HTMLAttributes,  } from "react";

export interface IPlaylistProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    deleteFunc?: () => void;
    title: string,
    isLocal: boolean
    tracksLength: number
    id: string
}