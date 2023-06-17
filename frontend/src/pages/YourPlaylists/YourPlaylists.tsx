import Title from '../../components/UI/Title/Title'
import Playlist from '../../components/Playlist/Playlist'
import { useGetLocalPlaylistsMutation } from '../../store/api/playlist/playlist.api'
import { useEffect } from 'react'


import styles from "./YourPlaylists.module.scss"
import PlaylistLoader from '../../components/Playlistloader/PlaylistLoader'
import { IPlaylist } from '../../types/playlist.interface'


const YourPlaylist = () => {
    const [getPlaylists, res] = useGetLocalPlaylistsMutation()

    useEffect(() => {
        getPlaylists("")
    },[getPlaylists])

  return (
    <div>
        <Title text='Your palylists'/>
        <div className={styles.content}>
            <div className={styles.playlists}>
                {res.isLoading ? <PlaylistLoader lengthItems={20}/>: null}
                {res.isSuccess ? 
                    <div className={styles.playlists}>
                        {res.data.map((playlist:IPlaylist) => <Playlist id={playlist._id} title={playlist.title} tracksLength={playlist.tracks.length}/>)}
                    </div>:
                    null  
                }
            </div>
        </div>
    </div>
  )
}

export default YourPlaylist