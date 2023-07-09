import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetPlaylistForIdMutation } from '../../store/api/playlist/playlist.api'
import MusicBlock from '../../components/MusicBlock/MusicBlock'
import { IPlaylistProps } from './Playlist.props'

const Playlist = ({isLocal}:IPlaylistProps) => {
    const location = useLocation()
    const [getPlaylist, res] = useGetPlaylistForIdMutation()
    useEffect(() => {
      if(isLocal === true){
        getPlaylist(location.pathname.split("/")[3])
      } else {
        getPlaylist(location.pathname.split("/")[2])
      }
    },[getPlaylist,location.pathname,isLocal])

  return (
    <div>
      {res.isSuccess && res.data ? 
        <MusicBlock isLocal={isLocal} playlistId={res.data._id}  musics={res.data.tracks} title={res.data.title}/>:
        null
      }
    </div>
  )
}

export default Playlist