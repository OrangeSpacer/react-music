import { useEffect } from 'react'
import { useDleteYourTrackMutation, useGetYourMusicMutation } from '../../store/api/music/music.api'
import { setMusic,deleteMusic } from '../../store/features/yourMusic/yourMusicSlice'
import { IMusicData } from '../../types/music.interface'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import MusicBlock from '../../components/MusicBlock/MusicBlock'

const YourMusic = () => {
    const [getMusic,res] = useGetYourMusicMutation()
    const [deleteReqMusic] = useDleteYourTrackMutation()
    const {data} = useAppSelector(state => state.yourMusicReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        getMusic("")
    },[getMusic])

    useEffect(() => {
      dispatch(setMusic(res.data as IMusicData[]))
    },[res.data,res.isSuccess,dispatch])

    
    const handleDelte = (id?:string) => {
      if(data){
        const newData = [...data]
        const deleteIndex = newData?.findIndex(item => item._id == id)
        newData.splice(deleteIndex,1)
        deleteReqMusic(id)
        dispatch(deleteMusic(newData))
      }
    }

    console.log(data)

    return (
    <div>
        {(res.isSuccess && data) ? <MusicBlock musics={data} title='Your music' deleteMusic={handleDelte}/>: null}
    </div>
  )
}

export default YourMusic