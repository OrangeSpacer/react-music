import { ITrackNavigation } from "./TrackNavigation.interface";

import styles from "./TrackNavigation.module.scss";

const TrackNavigation = ({
	nextTrack,
	prevTrack,
	startTrack,
	stopTrack,
	isPlaying,
}: ITrackNavigation) => {
	return (
		<div className={styles.navigation}>
			<div>
				<button onClick={prevTrack} className={styles.btn}>
					<img src="/img/player/prev.svg" alt="prev" />
				</button>
			</div>
			<div>
				{isPlaying ? (
					<button onClick={stopTrack} className={styles.btn}>
						<img src="/img/player/pause.svg" alt="stop" />
					</button>
				) : (
					<button onClick={startTrack} className={styles.btn}>
						<img src="/img/player/play.svg" alt="play" />
					</button>
				)}
			</div>
			<div>
				<button onClick={nextTrack} className={styles.btn}>
					<img src="/img/player/next.svg" alt="next" />
				</button>
			</div>
		</div>
	);
};

export default TrackNavigation;
