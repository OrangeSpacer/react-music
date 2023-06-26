import Title from '../UI/Title/Title'
import { IMusicBlock } from './MusicBlock.props'
import Music from '../Music/Music'

import styles from "./MusicBlock.module.scss"
import { useAddInFavortiesMutation, useDeleteInFavortiesMutation, useGetAllFavoritesMutation } from '../../store/api/favorites/favorites.api'
import Loader from '../Loader/Loader'
import { useCallback, useEffect } from 'react'

const MusicBlock = ({musics,title,addInPlaylist,deleteInPlaylist,deleteMusic}: IMusicBlock) => {
  const [getFavorites, res] = useGetAllFavoritesMutation()
  const [addFavorites] = useAddInFavortiesMutation()
  const [deleteFavorties] = useDeleteInFavortiesMutation()
  useEffect(() => {
    getFavorites("")
  },[getFavorites])



  const handleCheckFavorties = useCallback((id:string):boolean => {
    if(res.data?.findIndex(item => item._id == id) !== -1) {
      return true
    } else {
      return false
    }
  },[res.data])

  const handleAddFavorites = (id: string) => {
    addFavorites({trackId: id})
  }

  const handleDeleteFavorties = (id: string) => {
    deleteFavorties({trackId: id})
  }
  
  return (
    <div>
        <div className={styles.titleBlock}>
            <Title text={title}/>
        </div>
        <div className={styles.musicBlock}>
            {res.isSuccess ?  musics.map(music => <Music id={music._id} key={music._id} musicData={music} addFavorties={() => handleAddFavorites(music._id)} deleteFavorites={() => handleDeleteFavorties(music._id)}  isFavorites={handleCheckFavorties(music._id)} addInPlaylist={addInPlaylist} deleteInPlaylist={deleteInPlaylist} deleteMusic={deleteMusic}/>): <Loader/>}
        </div>
    </div>
  )
}

export default MusicBlock