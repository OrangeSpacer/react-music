export interface ITrackProgress {
    minValue: number
    maxValue: number
    currentTime?: string
    allTime?: string
    onChnage: (e: any) => void;
}