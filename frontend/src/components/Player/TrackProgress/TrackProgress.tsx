import InputRange from "../../UI/InputRange/InputRange";
import { ITrackProgress } from "./TrackProgress.interface";

import styles from "./TrackProgress.module.scss";

const TrackProgress = ({ maxValue, minValue, allTime, currentTime, onChnage }: ITrackProgress) => {
	return (
		<div className={styles.trackRange}>
			{currentTime && allTime ? (
				<div className={styles.time}>{currentTime}</div>
			) : (
				<div className={styles.time}>{minValue}</div>
			)}
			<InputRange maxValue={maxValue} minValue={minValue} onChnage={onChnage} />
			{currentTime && allTime ? (
				<div className={styles.time}>{allTime}</div>
			) : (
				<div className={styles.time}>{maxValue}</div>
			)}
		</div>
	);
};

export default TrackProgress;
