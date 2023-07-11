export interface IMusicFuncProps {
    deleteTrack?: (id: string) => void;
    trackId: string
    playlistId?: string
}