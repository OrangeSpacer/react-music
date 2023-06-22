import Title from '../UI/Title/Title'
import { IMusicBlock } from './MusicBlock.props'
import Music from '../Music/Music'

import styles from "./MusicBlock.module.scss"
import { useGetAllFavoritesMutation } from '../../store/api/favorites/favorites.api'
import Loader from '../Loader/Loader'
import { useCallback, useEffect } from 'react'

const MusicBlock = ({musics,title,addInPlaylist,deleteInPlaylist,deleteMusic}: IMusicBlock) => {
  const [getFavorites, res] = useGetAllFavoritesMutation()

  useEffect(() => {
    getFavorites("")
  },[getFavorites])

  const handleCheckFavorties = useCallback((id:string):boolean => {
    if(res.data?.includes(id)) {
      return true
    } else {
      return false
    }
  },[res.data])


  
  return (
    <div>
        <div className={styles.titleBlock}>
            <Title text={title}/>
        </div>
        <div className={styles.musicBlock}>
            {res.isSuccess ?  musics.map(music => <Music key={music._id} musicData={music}  isFavorites={handleCheckFavorties(music._id)} addInPlaylist={addInPlaylist} deleteInPlaylist={deleteInPlaylist} deleteMusic={deleteMusic}/>): <Loader/>}
        </div>
    </div>
  )
}

export default MusicBlock