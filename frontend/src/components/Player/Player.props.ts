export interface IPlayer {
    imagePath: string
    title: string
    author: string
    musicPath: string,
    nextMusic: () => void;
    prevMusic: () => void;
}