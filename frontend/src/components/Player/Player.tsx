import { ChangeEvent, useEffect,useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { pauseMusic, playMusic, setCurrentTime, setCurrentTrack, setDuration, setVolumeTrack } from '../../store/features/player/playerSlice'
import TrackProgress from './TrackProgress/TrackProgress'

import styles from "./player.module.scss"
import TrackNavigation from './TrackNavigation/TrackNavigation'
import TrackInfo from './TrackInfo/TrackInfo'
import TrackVolume from './TrackVolume/TrackVolume'

let audio:HTMLAudioElement

const Player = () => {
  const dispatch = useAppDispatch()
  const {currentTrack,tracks,isPlaying: playTack,currentTime,durationTrack,volumeTrack} = useAppSelector(state => state.playerReducer)
  const [currentTimeFormat, setCurrentTimeFormat] = useState("0:0")
  const [allTimeFormat, setAllTimeFormat] = useState("0:0")
  const [isPlaying,setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    if(currentTrack){
      if(audio?.src){
        audio.src = ""
      }
      audio = new Audio()
      audio.src = "http://127.0.0.1:5000/" + currentTrack?.trackPath
      setAudio()
    }
  },[tracks,currentTrack,dispatch])

  const setAudio = () => {
    if(currentTrack){
      audio.onloadedmetadata = () => {
        setAllTimeFormat(convertTime(audio.duration))
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        setCurrentTimeFormat(convertTime(audio.currentTime))
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
      audio.play()
      audio.volume = volumeTrack/100
      dispatch(playMusic())
      setIsPlaying(true)
    }
  }


  const handleNextTrack = () => {
    const currentId = tracks.findIndex(track => track._id == currentTrack?._id)
    if(tracks.length != currentId+1){
      dispatch(setCurrentTrack(tracks[currentId+1]._id))
    } else {
      dispatch(setCurrentTrack(tracks[0]._id))
    }
  }

  const handlePrevtrack = () => {
    const currentId = tracks.findIndex(track => track._id == currentTrack?._id)
    if(currentId == 0){
      dispatch(setCurrentTrack(tracks[tracks.length-1]._id))
    } else {
      dispatch(setCurrentTrack(tracks[currentId-1]._id))
    }
  }


  const handlePlay = () => {
    audio.play()
    dispatch(playMusic())
    setIsPlaying(true)
  }
  const handlePause = () => {
    if(audio){
      audio.pause()
      dispatch(pauseMusic())
      setIsPlaying(false)
    }
  }

  const handleChnageVolume = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolumeTrack(parseInt(e.target.value)))
    audio.volume = Number(e.target.value) / 100
  }

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentTime(Number(e.target.value)))
    audio.currentTime = Number(e.target.value)
  }

  const convertTime = (time: number) => {
    let sec: string | number = Math.floor( time );
    let min: string | number = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ":"+ sec;
  }


  useEffect(() => {
    if(playTack == false){
      handlePause()
    } else {
      handlePlay()
    }
  },[playTack])


  return (
    <div className={styles.playerBlock} style={currentTrack ? {height: "80px", opacity:"1",transition: "all 0.5s ease"}:{visibility: "hidden",height:"0px",opacity:"0",transition: "all 0.5s ease"}}>
      <div className={styles.trackInfoBlock}>
        {currentTrack ? <TrackInfo author={currentTrack?.author} title={currentTrack?.title} imgPath={currentTrack?.imagePath}/>: null}
      </div>
      <div className={styles.navigationBlock}>
        <div>
          <TrackNavigation isPlaying={isPlaying} nextTrack={handleNextTrack} prevTrack={handlePrevtrack} startTrack={handlePlay} stopTrack={handlePause}/>
        </div>
        <div>
          <TrackProgress allTime={allTimeFormat} currentTime={currentTimeFormat} minValue={currentTime} maxValue={durationTrack} onChnage={handleChangeTime}/>
        </div>
      </div>
      <div className={styles.volumeBlock}>
        <TrackVolume minValue={volumeTrack} maxValue={100} onChange={handleChnageVolume}/>
      </div>
    </div>
  )
}

export default Player