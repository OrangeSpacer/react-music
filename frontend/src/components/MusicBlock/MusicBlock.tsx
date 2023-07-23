import Title from "../UI/Title/Title";
import { IMusicBlock } from "./MusicBlock.props";
import Music from "../Music/Music";
import {
	useAddInFavortiesMutation,
	useDeleteInFavortiesMutation,
	useGetAllFavoritesMutation,
} from "../../store/api/favorites/favorites.api";
import Loader from "../Loader/Loader";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeMusicInPlaylist } from "../../store/features/yourPlaylist/yourPlaylist.slice";
import { useDeleteTrackFromPlaylistMutation } from "../../store/api/playlist/playlist.api";
import { pauseMusic, playMusic, setPlayerTracks } from "../../store/features/player/playerSlice";

import styles from "./MusicBlock.module.scss";

const MusicBlock = ({ musics, title, isLocal, playlistId, deleteMusic }: IMusicBlock) => {
	const { currentTrack, isPlaying, tracks } = useAppSelector((state) => state.playerReducer);
	const [getFavorites, res] = useGetAllFavoritesMutation();
	const [addFavorites] = useAddInFavortiesMutation();
	const [deleteFavorties] = useDeleteInFavortiesMutation();
	const [removeTrack] = useDeleteTrackFromPlaylistMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		getFavorites("");
	}, [getFavorites]);

	const handleCheckFavorties = useCallback(
		(id: string): boolean => {
			if (res.data?.findIndex((item) => item._id == id) !== -1) {
				return true;
			} else {
				return false;
			}
		},
		[res.data],
	);

	const handleAddFavorites = (id: string) => {
		addFavorites({ trackId: id });
	};

	const handleDeleteFavorties = (id: string) => {
		deleteFavorties({ trackId: id });
	};

	const handleSetMusics = () => {
		if (tracks.length == 0 || musics[0].title != tracks[0]?.title) {
			dispatch(setPlayerTracks(musics));
		}
		dispatch(playMusic());
	};

	const handlePauseMusics = () => {
		dispatch(pauseMusic());
	};

	const handleRemoveMusic = (id: string) => {
		const removeIndex = musics.findIndex((item) => item._id == id);
		const object = {
			idPlaylist: playlistId,
			idTrack: id,
		};
		removeTrack(object);
		dispatch(removeMusicInPlaylist(removeIndex));
	};

	return (
		<div>
			<div className={styles.titleBlock}>
				<Title text={title} />
			</div>
			<div className={styles.musicBlock}>
				{res.isSuccess ? (
					musics.map((music) => (
						<Music
							playlistId={playlistId}
							isLocal={typeof isLocal == "boolean" && isLocal}
							isPlaying={music._id == currentTrack?._id && isPlaying}
							deleteMusic={deleteMusic}
							playMusic={handleSetMusics}
							pauseMusic={handlePauseMusics}
							removeFromPlaylist={() => handleRemoveMusic(music._id)}
							id={music._id}
							key={music._id}
							musicData={music}
							addFavorties={() => handleAddFavorites(music._id)}
							deleteFavorites={() => handleDeleteFavorties(music._id)}
							isFavorites={handleCheckFavorties(music._id)}
						/>
					))
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default MusicBlock;
