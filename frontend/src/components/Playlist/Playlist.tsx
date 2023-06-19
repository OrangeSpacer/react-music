import { IPlaylistProps } from "./Playlist.props"

import styles from "./Playlist.module.scss"
import { Link } from "react-router-dom"

const Playlist = ({id,title,tracksLength}: IPlaylistProps) => {
  return (
    <Link to={`/playlists/${id}`} className={styles.link}>
        <div className={styles.playlist}>
            <div className={styles.imgBlock}>
                <img src="/img/playlist/playlist.jpg" loading="lazy" alt="imgPlaylist" className={styles.img}/>
            </div>
            <div className={styles.infoBlock}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.tracks}>
                    Tracks count: {tracksLength}
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Playlist