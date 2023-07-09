import { IPlaylistProps } from "./Playlist.props"

import styles from "./Playlist.module.scss"
import { Link } from "react-router-dom"

const Playlist = ({id,title,tracksLength, isLocal, deleteFunc}: IPlaylistProps) => {
  return (
    <div>
        <Link to={isLocal ? `/playlists/local/${id}`:`/playlists/${id}`} className={styles.link}>
            <div className={styles.playlist}>
                <div className={styles.imgBlock}>
                    <img src="/img/playlist/playlist.jpg" loading="lazy" alt="imgPlaylist" className={styles.img}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.infoBlock}>
                        <div className={styles.title}>
                            {title}
                        </div>
                        <div className={styles.tracks}>
                            Tracks count: {tracksLength}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        {deleteFunc && 
            <div onClick={deleteFunc} className={styles.deleteBtn}>
                <img src="/img/playlist/delete.svg"/>
            </div>
        }
    </div>
  )
}

export default Playlist