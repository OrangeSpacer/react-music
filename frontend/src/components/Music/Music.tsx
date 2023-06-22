import Button from '../UI/Button/Button'
import { IMusic } from './Music.props'
import { useEffect, useState } from 'react'
import MusicFunc from './MusicFunc/MusicFunc'
import { useAddInFavortiesMutation, useDeleteInFavortiesMutation } from '../../store/api/favorites/favorites.api'

import styles from "./Music.module.scss"


const Music = ({musicData,deleteMusic,isFavorites,addInPlaylist,deleteInPlaylist}:IMusic) => {
    const [openFunc,setOpenFunc] = useState(false)
    const [favorties, setFavorties] = useState(isFavorites)
    const [addFavorites] = useAddInFavortiesMutation()
    const [removeFavorties] = useDeleteInFavortiesMutation()

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
            removeFavorties({trackId: musicData._id})
            setFavorties(prev => !prev)
        } else {
            addFavorites({trackId: musicData._id})
            setFavorties(prev => !prev)
        }
    }

    return (
    <div className={styles.music}>
        <div className={styles.left}>
            <Button typeView='circle' func={() => console.log("Play music")}>
                play
            </Button>
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
            <button onClick={handleFavorties}>
                {favorties ? <img src='/img/music/inFavorites.png' style={{width:"15px"}}/>:<img src='/img/music/notFavorites.png' style={{width:"15px"}}/>}
            </button>
            <button className={styles.function} onClick={handleOpen}>
                <img src="/img/music/function.svg" alt="function" />
            </button>
            {openFunc === true ? <MusicFunc  handleDelete={deleteMusic ? deleteMusic:null} id={musicData._id}/>:null}
        </div>
    </div>
    )
}

export default Music