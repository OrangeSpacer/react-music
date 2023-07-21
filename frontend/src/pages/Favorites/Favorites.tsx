import { useEffect } from 'react'
import { useDeleteInFavortiesMutation, useGetAllFavoritesMutation } from '../../store/api/favorites/favorites.api'
import Loader from '../../components/Loader/Loader'
import Title from '../../components/UI/Title/Title'
import Music from '../../components/Music/Music'

import styles from "./Favorties.module.scss"
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteFavoritesForIdCheck, setFavorties } from '../../store/features/favorties/favoritesSlice'
import { pauseMusic, playMusic, setPlayerTracks } from '../../store/features/player/playerSlice'

const Favorites = () => {
    const [getFavorites,res] = useGetAllFavoritesMutation()
    const [deleteFavorites] = useDeleteInFavortiesMutation()
    const dispatch = useAppDispatch()
    const {favorties} = useAppSelector(state => state.favoritesReducer)
    const {currentTrack,isPlaying,tracks} = useAppSelector(state => state.playerReducer)
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

    const handleSetMusics = () => {
      if(favorties != null && (tracks.length == 0 || favorties[0].title != tracks[0]?.title)){
        dispatch(setPlayerTracks(favorties))
      }
      dispatch(playMusic())
    }
  
    const handlePauseMusics = () => {
      dispatch(pauseMusic())
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
              {res.data && favorties && favorties.map(music => <Music id={music._id} isLocal={false} isPlaying={music._id == currentTrack?._id && isPlaying}  key={music._id} playMusic={handleSetMusics} pauseMusic={handlePauseMusics} musicData={music} isFavorites={true} deleteFavorites={() => handleDeleteFavorites(music._id)}/>)}
            </div>
          </div>:
          null
        }
    </div>
  )
}

export default Favorites