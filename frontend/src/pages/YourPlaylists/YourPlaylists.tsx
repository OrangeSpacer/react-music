import Title from '../../components/UI/Title/Title'
import Playlist from '../../components/Playlist/Playlist'
import { useGetLocalPlaylistsMutation } from '../../store/api/playlist/playlist.api'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


import styles from "./YourPlaylists.module.scss"
import PlaylistLoader from '../../components/Playlistloader/PlaylistLoader'


const YourPlaylist = () => {
    const [getPlaylists, res] = useGetLocalPlaylistsMutation()
    const loadingArray = []
    useEffect(() => {
        getPlaylists("")
    },[getPlaylists])

  return (
    <div>
        <Title text='Your palylists'/>
        <div className={styles.playlists}>
            {res.isLoading ? new Array(15).fill("").map((item,index) => <PlaylistLoader key={index}/>): null}
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
    </div>
  )
}

export default YourPlaylist