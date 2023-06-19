import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetPlaylistForIdMutation } from '../../store/api/playlist/playlist.api'
import MusicBlock from '../../components/MusicBlock/MusicBlock'

const Playlist = () => {
    const location = useLocation()
    const [getPlaylist, res] = useGetPlaylistForIdMutation()
    useEffect(() => {
        getPlaylist(location.pathname.split("/")[2])
    },[])

  return (
    <div>
      {res.isSuccess && res.data ? 
        <MusicBlock musics={res.data.tracks} title={res.data.title}/>:
        null
      }
    </div>
  )
}

export default Playlist