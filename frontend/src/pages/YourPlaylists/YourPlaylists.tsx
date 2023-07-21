import { useDeletePlaylistMutation, useGetLocalPlaylistsMutation } from '../../store/api/playlist/playlist.api'
import { useEffect } from 'react'


import Loader from '../../components/Loader/Loader'
import PlaylistBlock from '../../components/PlaylistBlock/PlaylistBlock'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deletePlaylist, setPlaylist } from '../../store/features/yourPlaylist/yourPlaylist.slice'


const YourPlaylist = () => {
    const [getPlaylists, res] = useGetLocalPlaylistsMutation()
    const {data} = useAppSelector(state => state.yourPlaylist)
    const dispatch = useAppDispatch()
    const [removePlaylist] = useDeletePlaylistMutation()
    useEffect(() => {
        getPlaylists("")
    },[getPlaylists])

    useEffect(() => {
      dispatch(setPlaylist(res.data))
    },[res.data,dispatch])

    const handleRemovePlaylist = (id: string) => {
      const indexRemove = data?.findIndex(item => item._id == id)
      if(typeof indexRemove == "number"){
        dispatch(deletePlaylist(indexRemove))
      }
      removePlaylist(id)
    }

  return (
    <div>
        {res.isLoading && <Loader/>}
        {res.isSuccess && res.data && data ? <PlaylistBlock removePlaylist={handleRemovePlaylist} isLocal={true} title='Your palylists' fetchData={data}/>:null}
    </div>
  )
}

export default YourPlaylist