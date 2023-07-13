import { useEffect,useState } from 'react'
import { IPlayer } from './Player.props'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { pauseMusic, playMusic, setCurrentTrack } from '../../store/features/player/playerSlice'


let audio:HTMLAudioElement

const Player = ({author,imagePath,title}:IPlayer) => {
  const dispatch = useAppDispatch()
  const {currentTrack,tracks,isPlaying: playTack} = useAppSelector(state => state.playerReducer)
  const [isPlaying,setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    if(currentTrack){
      if(audio?.src){
        audio.src = ""
      }
      audio = new Audio()
      audio.src = "http://127.0.0.1:5000/" + currentTrack?.trackPath
      audio.play()
      dispatch(playMusic())
      setIsPlaying(true)
    }
  },[tracks,currentTrack,dispatch])


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



  useEffect(() => {
    if(playTack == false){
      handlePause()
    } else {
      handlePlay()
    }
  },[playTack])

  console.log("http://127.0.0.1:5000/" + currentTrack?.trackPath)

  return (
    <div style={{color:"white"}}>
      <div>
        <div>
          <img  src={imagePath}/>
        </div>
        <div>
          <div>
            {title}
          </div>
          <div>
            {author}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <button onClick={handlePrevtrack}>
              prev
            </button>
          </div>
          <div>
            {isPlaying ? 
              <button onClick={handlePause}>
                stop
              </button>:
              <button onClick={handlePlay}>
                play
              </button>
            }
          </div>
          <div onClick={handleNextTrack}>
            next
          </div>
        </div>
        <div>
          <div>дорожка</div>
        </div>
      </div>
    </div>
  )
}

export default Player