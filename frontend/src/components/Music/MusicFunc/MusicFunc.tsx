import { useState } from 'react'
import { IMusicFuncProps } from './MusicFunc.props'
import { useAddTrackInPlaylistMutation,useDleteTrackFromPlaylistMutation,useGetLocalPlaylistsSingleQuery} from '../../../store/api/playlist/playlist.api'


import styles from "./MusicFunc.module.scss"
import Notification from '../../Notification/Notification'
import { IPlaylist } from '../../../types/playlist.interface'

const MusicFunc = ({deleteInPlaylistFunc,trackId, playlistId}: IMusicFuncProps) => {
  const [playlistOpen,setPlaylistOpen] = useState(false)
  const [addTrack,res] = useAddTrackInPlaylistMutation()
  const [deleteTrack] = useDleteTrackFromPlaylistMutation()
  const {data} = useGetLocalPlaylistsSingleQuery("")

  console.log(deleteInPlaylistFunc)

  const handleAddTrack = (idPlaylist: string) => {
    addTrack({idPlaylist: idPlaylist, idTrack: trackId})
  }

  const handleDeleteFromPlaylist = () => {
    deleteTrack({idPlaylist: playlistId, idTrack: trackId})
  }

  return (
    <div className={styles.container}>
        {res.isSuccess && <Notification message='success' type='success'/>}
        {res.isError && <Notification message='error' type='error'/>}
        <div onClick={() => setPlaylistOpen(prev => !prev)} className={styles.openPlaylist}>
          add to playlist
        </div>
        {deleteInPlaylistFunc && <div onClick={handleDeleteFromPlaylist}>remove track</div>}
        {playlistOpen && data.length ? <div className={styles.playlistsBlock}>{data.map((item:IPlaylist) => <div key={item._id} className={styles.playlist} onClick={() => handleAddTrack(item._id)}>{item.title}</div>)}</div>: null}
    </div>
  )
}

export default MusicFunc