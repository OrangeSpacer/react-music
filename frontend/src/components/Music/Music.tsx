import Button from '../UI/Button/Button'
import { IMusic } from './Music.props'
import { useEffect, useState } from 'react'
import MusicFunc from './MusicFunc/MusicFunc'

import styles from "./Music.module.scss"
import { useAppDispatch } from '../../hooks/redux'
import { setCurrentTrack,pauseMusic } from '../../store/features/player/playerSlice'


const Music = ({musicData,id,deleteMusic,isFavorites, addFavorties, deleteFavorites, isLocal,removeFromPlaylist,playMusic, isPlaying = false,pauseMusic}:IMusic) => {
    const [playTrack,setPlayTrack] = useState(isPlaying)
    const [openFunc,setOpenFunc] = useState(false)
    const [favorties, setFavorties] = useState(isFavorites)
    const dispatch = useAppDispatch()


    useEffect(() => {
        setPlayTrack(isPlaying)
    },[isPlaying])

    useEffect(() => {
        const favortiesCheck = isFavorites
        if(favortiesCheck) {
            setFavorties(favortiesCheck)
        }
    },[isFavorites])
    
    const handleOpen = () => {
        setOpenFunc(!openFunc)
    }

    const handleFavorties = () => {
        if(favorties == true) {
            if(deleteFavorites) {
                deleteFavorites()
            }
            setFavorties(prev => !prev)
        } else {
            if(addFavorties) {
                addFavorties()
            }
            setFavorties(prev => !prev)
        }
    }

    const handlePlayMusic = () => {
        if(playMusic){
            playMusic()
        }
        setPlayTrack(true)
        dispatch(setCurrentTrack(id))
    }

    const handlePauseMusic = () => {
        if(pauseMusic){
            pauseMusic()
        }
        setPlayTrack(false)
        dispatch(setCurrentTrack(id))
    }


    return (
    <div className={styles.music}>
        <div className={styles.left}>
            {playTrack ? 
                <Button typeView='circle' func={handlePauseMusic}>
                    stop
                </Button>:
                <Button typeView='circle' func={handlePlayMusic}>
                    play
                </Button>
            }
            <div className={styles.logo}>
                <img src={"http://127.0.0.1:5000/" + musicData.imagePath} alt="musicImg" />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    {musicData.title}
                </div>
                <div className={styles.author}>
                    {musicData.author}
                </div>
            </div>
        </div>
        <div className={styles.right}>
            {isLocal == true ? 
                <div className={styles.remove} onClick={removeFromPlaylist}>
                    <img src="/img/playlist/delete.svg"/>
                </div>: 
                null
            }
            {(addFavorties || deleteFavorites) ? 
                <button onClick={handleFavorties}>
                    {favorties ? <img src='/img/music/inFavorites.png' style={{width:"15px"}}/>:<img src='/img/music/notFavorites.png' style={{width:"15px"}}/>}
                </button>:
                null
            }
            <button className={styles.function} onClick={handleOpen}>
                <img src="/img/music/function.svg" alt="function" />
            </button>
            {openFunc === true ? <MusicFunc trackId={id} deleteTrack={deleteMusic} id={musicData._id}/>:null}
        </div>
    </div>
    )
}

export default Music