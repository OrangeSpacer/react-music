import InputRange from "../../UI/InputRange/InputRange";
import { ITrackVolume } from "./TrackVolume.interface";
import styles from "./TrackVolume.module.scss";

const TrackVolume = ({ maxValue, minValue, onChange }: ITrackVolume) => {
	return (
		<div className={styles.volumeBlock}>
			<img src="/img/player/volume.svg" alt="volume" />
			<InputRange minValue={minValue} maxValue={maxValue} onChnage={onChange} />
		</div>
	);
};

export default TrackVolume;
