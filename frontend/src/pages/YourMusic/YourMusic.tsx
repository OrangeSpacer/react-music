import { useEffect } from 'react'
import { useDleteYourTrackMutation, useGetYourMusicMutation } from '../../store/api/music/music.api'
import Music from '../../components/Music/Music'
import { setMusic,deleteMusic } from '../../store/features/yourMusic/yourMusicSlice'
import { IMusicData } from '../../types/music.interface'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const YourMusic = () => {
    const [getMusic,res] = useGetYourMusicMutation()
    const [deleteReqMusic,deleteRes] = useDleteYourTrackMutation()
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

    return (
    <div>
        {(res.isSuccess && data) ? data.map((music:any) => <Music deleteMusic={() => handleDelte(music._id)} musicData={music} key={music._id}/>): null}
    </div>
  )
}

export default YourMusic