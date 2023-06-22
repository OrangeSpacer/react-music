import { useEffect } from 'react'
import { useGetAllFavoritesMutation } from '../../store/api/favorites/favorites.api'
import Loader from '../../components/Loader/Loader'
import Title from '../../components/UI/Title/Title'
import Music from '../../components/Music/Music'

import styles from "./Favorties.module.scss"

const Favorites = () => {
    const [getFavorites,res] = useGetAllFavoritesMutation()
    
    useEffect(() => {
      getFavorites("")
    },[getFavorites])

  return (
    <div>
        {res.isLoading ? <Loader/>: null}
        {res.isSuccess ? 
          <div>
            <div  className={styles.titleBlock}>
              <Title text='Favorites'/>
            </div>
            <div className={styles.musicBlock}>
              {res.data && res.data.map(music => <Music key={music._id} musicData={music}/>)}
            </div>
          </div>:
          null
        }
    </div>
  )
}

export default Favorites