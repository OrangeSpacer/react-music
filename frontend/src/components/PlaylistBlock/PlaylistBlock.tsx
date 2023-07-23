import Title from "../UI/Title/Title";

import styles from "./PlaylistBlock.module.scss";
import { IPlaylistBlock } from "./PlaylistBlock.props";
import { IPlaylist } from "../../types/playlist.interface";
import Playlist from "../Playlist/Playlist";

const PlaylistBlock = ({ title, fetchData, isLocal, removePlaylist }: IPlaylistBlock) => {
	return (
		<div>
			<Title text={title} />
			<div className={styles.content}>
				<div className={styles.playlists}>
					<div className={styles.playlists}>
						{fetchData?.map((playlist: IPlaylist) => (
							<Playlist
								deleteFunc={() => removePlaylist(playlist._id)}
								isLocal={isLocal}
								id={playlist._id}
								title={playlist.title}
								key={playlist._id}
								tracksLength={playlist.tracks.length}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaylistBlock;
