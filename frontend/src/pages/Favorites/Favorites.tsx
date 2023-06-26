import { useEffect } from 'react'
import { useDeleteInFavortiesMutation, useGetAllFavoritesMutation } from '../../store/api/favorites/favorites.api'
import Loader from '../../components/Loader/Loader'
import Title from '../../components/UI/Title/Title'
import Music from '../../components/Music/Music'

import styles from "./Favorties.module.scss"
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteFavoritesForIdCheck, setFavorties } from '../../store/features/favorties/favoritesSlice'

const Favorites = () => {
    const [getFavorites,res] = useGetAllFavoritesMutation()
    const [deleteFavorites] = useDeleteInFavortiesMutation()
    const dispatch = useAppDispatch()
    const {favorties} = useAppSelector(state => state.favoritesReducer)
    useEffect(() => {
      getFavorites("")
    },[getFavorites])

    useEffect(() => {
      if(res.data){
        dispatch(setFavorties(res.data))
      }
    },[dispatch,res.data])

    const handleDeleteFavorites = (id: string) => {
      deleteFavorites({trackId: id})
      dispatch(deleteFavoritesForIdCheck(id))
    }

  return (
    <div>
        {res.isLoading ? <Loader/>: null}
        {res.isSuccess ? 
          <div>
            <div  className={styles.titleBlock}>
              <Title text='Favorites'/>
            </div>
            <div className={styles.musicBlock}>
              {res.data && favorties && favorties.map(music => <Music key={music._id} musicData={music} isFavorites={true} deleteFavorites={() => handleDeleteFavorites(music._id)}/>)}
            </div>
          </div>:
          null
        }
    </div>
  )
}

export default Favorites