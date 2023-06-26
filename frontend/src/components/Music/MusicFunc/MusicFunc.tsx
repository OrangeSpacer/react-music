import { useState } from 'react'
import { useDleteYourTrackMutation } from '../../../store/api/music/music.api'
import { IMusicFuncProps } from './MusicFunc.props'
import { useAddTrackInPlaylistMutation, useGetPlaylistAllQuery } from '../../../store/api/playlist/playlist.api'


import styles from "./MusicFunc.module.scss"
import Notification from '../../Notification/Notification'

const MusicFunc = ({deleteInPlaylistFunc,trackId}: IMusicFuncProps) => {
  const [playlistOpen,setPlaylistOpen] = useState(false)
  const [addTrack,res] = useAddTrackInPlaylistMutation()
  const {data} = useGetPlaylistAllQuery("")

  const handleAddTrack = (idPlaylist: string) => {
    addTrack({idPlaylist: idPlaylist, idTrack: trackId})
  }

  return (
    <div className={styles.container}>
        {res.isSuccess && <Notification message='success' type='success'/>}
        {res.isError && <Notification message='error' type='error'/>}
        <div onClick={() => setPlaylistOpen(prev => !prev)} className={styles.openPlaylist}>
          add to playlist
        </div>
        {deleteInPlaylistFunc && <div>remove track</div>}
        {playlistOpen && data ? <div className={styles.playlistsBlock}>{data.map(item => <div className={styles.playlist} onClick={() => handleAddTrack(item._id)}>{item.title}</div>)}</div>: null}
    </div>
  )
}

export default MusicFunc