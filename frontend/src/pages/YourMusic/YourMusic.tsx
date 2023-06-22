import { useEffect } from 'react'
import { useDleteYourTrackMutation, useGetYourMusicQuery } from '../../store/api/music/music.api'
import { setMusic,deleteMusic } from '../../store/features/yourMusic/yourMusicSlice'
import { IMusicData } from '../../types/music.interface'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import MusicBlock from '../../components/MusicBlock/MusicBlock'
import Loader from '../../components/Loader/Loader'

const YourMusic = () => {
    const {data:musics, isLoading} = useGetYourMusicQuery("")
    const [deleteReqMusic] = useDleteYourTrackMutation()
    const {data} = useAppSelector(state => state.yourMusicReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(setMusic(musics as IMusicData[]))
    },[musics,dispatch])

    
    const handleDelte = (id?:string) => {
      if(data){
        const newData = [...data]
        const deleteIndex = newData?.findIndex(item => item._id == id)
        newData.splice(deleteIndex,1)
        deleteReqMusic(id)
        dispatch(deleteMusic(newData))
      }
    }

    return (
    <div>
        {isLoading ? <Loader/>:null}
        {(musics && data) ? <MusicBlock musics={data} title='Your music' deleteMusic={handleDelte}/>: null}
    </div>
  )
}

export default YourMusic