import { useState } from "react";
import { IMusicFuncProps } from "./MusicFunc.props";
import {
	useAddTrackInPlaylistMutation,
	useGetLocalPlaylistsSingleQuery,
} from "../../../store/api/playlist/playlist.api";

import styles from "./MusicFunc.module.scss";
import { IPlaylist } from "../../../types/playlist.interface";

const MusicFunc = ({ deleteTrack, trackId }: IMusicFuncProps) => {
	const [playlistOpen, setPlaylistOpen] = useState(false);
	const [addTrack] = useAddTrackInPlaylistMutation();
	const { data } = useGetLocalPlaylistsSingleQuery("");

	const handleAddTrack = (idPlaylist: string) => {
		addTrack({ idPlaylist: idPlaylist, idTrack: trackId });
	};

	return (
		<div className={styles.container}>
			{deleteTrack && <div onClick={() => deleteTrack(trackId)}>remove track</div>}
			<div onClick={() => setPlaylistOpen((prev) => !prev)} className={styles.openPlaylist}>
				<img src="/img/music/left.svg" alt="open arrow" />
				<span style={{ marginLeft: "5px" }}>add to playlist</span>
			</div>
			{playlistOpen && data.length ? (
				<div className={styles.playlistsBlock}>
					{data.map((item: IPlaylist) => (
						<div key={item._id} className={styles.playlist} onClick={() => handleAddTrack(item._id)}>
							{item.title}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default MusicFunc;
