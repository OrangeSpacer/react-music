import { useGetLocalPlaylistsMutation } from '../../store/api/playlist/playlist.api'
import { useEffect } from 'react'


import Loader from '../../components/Loader/Loader'
import PlaylistBlock from '../../components/PlaylistBlock/PlaylistBlock'


const YourPlaylist = () => {
    const [getPlaylists, res] = useGetLocalPlaylistsMutation()

    useEffect(() => {
        getPlaylists("")
    },[getPlaylists])
    

  return (
    <div>
        {res.isLoading && <Loader/>}
        {res.isSuccess && res.data ? <PlaylistBlock title='Your palylists' fetchData={res.data}/>:null}
    </div>
  )
}

export default YourPlaylist