import Loader from '../../components/Loader/Loader'
import PlaylistBlock from '../../components/PlaylistBlock/PlaylistBlock'
import { useGetPlaylistAllQuery } from '../../store/api/playlist/playlist.api'

import styles from "./AllPlaylists.module.scss"

const AllPlaylists = () => {
  const {isLoading,data} = useGetPlaylistAllQuery("")

  return (
    <div className={styles.playlists}>
      {isLoading  ? <Loader/>: <PlaylistBlock title='All playlists' isLocal={false} fetchData={data}/>}
    </div>
  )
}

export default AllPlaylists