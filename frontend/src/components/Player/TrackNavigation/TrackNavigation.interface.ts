export interface ITrackNavigation {
    isPlaying: boolean;
    nextTrack: () => void;
    prevTrack: () => void;
    stopTrack: () => void;
    startTrack: () => void;
}