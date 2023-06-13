import { IPlaylistProps } from "./Playlist.props"

import styles from "./Playlist.module.scss"

const Playlist = ({id,title,tracksLength}: IPlaylistProps) => {
  return (
    <div className={styles.playlist}>
        <div className={styles.imgBlock}>
            <img src="/img/playlist/playlist.jpg" alt="imgPlaylist" className={styles.img}/>
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
  )
}

export default Playlist