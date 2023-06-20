import Title from '../UI/Title/Title'
import { IMusicBlock } from './MusicBlock.props'
import Music from '../Music/Music'

import styles from "./MusicBlock.module.scss"
import { useGetAllFavoritesQuery } from '../../store/api/favorites/favorites.api'
import Loader from '../Loader/Loader'

const MusicBlock = ({musics,title,addInPlaylist,deleteInPlaylist,deleteMusic}: IMusicBlock) => {
  const {data: favorites, isSuccess} = useGetAllFavoritesQuery("")

  const handleCheckFavorties = (id:string):boolean => {
    console.log(id)
    if(isSuccess && favorites?.includes(id)) {
      return true
    } else {
      return false
    }
  }
  return (
    <div>
        <div className={styles.titleBlock}>
            <Title text={title}/>
        </div>
        <div className={styles.musicBlock}>
            {isSuccess ?  musics.map(music => <Music key={music._id} musicData={music} isFavorties={handleCheckFavorties(music._id)} addInPlaylist={addInPlaylist} deleteInPlaylist={deleteInPlaylist} deleteMusic={deleteMusic}/>): <Loader/>}
        </div>
    </div>
  )
}

export default MusicBlock