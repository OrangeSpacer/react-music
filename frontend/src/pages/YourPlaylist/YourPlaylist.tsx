import { useEffect } from 'react'
import Title from '../../components/UI/Title/Title'
import { useGetLocalPlaylistsMutation } from '../../store/api/playlist/playlist.api'


import styles from "./YourPlaylist.module.scss"
import Playlist from '../../components/Playlist/Playlist'
import { Link } from 'react-router-dom'

const YourPlaylist = () => {
    const [getPlaylists, res] = useGetLocalPlaylistsMutation()

    useEffect(() => {
        const playlists = getPlaylists("")
    },[getPlaylists])

  return (
    <div>
        <Title text='Your palylists'/>
        {
            res.isLoading ? <div>Загрузка</div>: null
        }
        {res.isSuccess ? 
            <div className={styles.playlists}>
                {res.data.map((playlist:any) => 
                <Link to={`${playlist._id}`} className={styles.link} key={playlist._id}>
                    <Playlist id={playlist._id} title={playlist.title} tracksLength={playlist.tracks.length}/>
                </Link>
                )}
            </div>:
            null  
        }
    </div>
  )
}

export default YourPlaylist