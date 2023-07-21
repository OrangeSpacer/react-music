import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import PlaylistBlock from '../../components/PlaylistBlock/PlaylistBlock'
import { useGetPlaylistAllQuery } from '../../store/api/playlist/playlist.api'

import styles from "./AllPlaylists.module.scss"
import { IPlaylist } from '../../types/playlist.interface'

const AllPlaylists = () => {
  const {isLoading,data} = useGetPlaylistAllQuery("")
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])

  useEffect(() => {
    if(data){
      setPlaylists(data)
    }
  },[data])

  return (
    <div className={styles.playlists}>
      {isLoading  ? <Loader/>: <PlaylistBlock title='All playlists' isLocal={false} fetchData={playlists}/>}
    </div>
  )
}

export default AllPlaylists