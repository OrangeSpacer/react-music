import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetPlaylistForIdMutation } from '../../store/api/playlist/playlist.api'
import MusicBlock from '../../components/MusicBlock/MusicBlock'
import { IPlaylistProps } from './Playlist.props'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setMusicInPlaylist } from '../../store/features/yourPlaylist/yourPlaylist.slice'

const Playlist = ({isLocal}:IPlaylistProps) => {
    const location = useLocation()
    const [getPlaylist, res] = useGetPlaylistForIdMutation()
    const {music} = useAppSelector(state => state.yourPlaylist)
    const dispatch = useAppDispatch()
    useEffect(() => {
      if(isLocal === true){
        getPlaylist(location.pathname.split("/")[3])
      } else {
        getPlaylist(location.pathname.split("/")[2])
      }
    },[getPlaylist,location.pathname,isLocal])

    useEffect(() => {
      if(isLocal && res.data?.tracks) {
        dispatch(setMusicInPlaylist(res.data?.tracks))
      }
    }, [res.data,dispatch,isLocal])
    
  return (
    <div>
      {res.isSuccess && res.data ? 
        <MusicBlock isLocal={isLocal} playlistId={res.data._id}  musics={isLocal ? music:res.data.tracks} title={res.data.title}/>:
        null
      }
    </div>
  )
}

export default Playlist