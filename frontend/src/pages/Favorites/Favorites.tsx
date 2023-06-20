import { useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import MusicBlock from '../../components/MusicBlock/MusicBlock'
import { useGetAllFavoritesQuery } from '../../store/api/favorites/favorites.api'

const Favorites = () => {
    const {isLoading,data,isSuccess, refetch} = useGetAllFavoritesQuery("")
    useEffect(() => {
      refetch()
    },[refetch])

  return (
    <div>
        {isLoading && <Loader/>}
        {isSuccess && data ?  <MusicBlock title='Favorites' musics={data}/>:null}
    </div>
  )
}

export default Favorites