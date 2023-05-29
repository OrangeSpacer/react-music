import Button from '../UI/Button/Button'
import { IMusic } from './Music.props'

import styles from "./Music.module.scss"

import { useState } from 'react'
import MusicFunc from './MusicFunc/MusicFunc'

const Music = ({musicData,deleteMusic}:IMusic) => {
    const [openFunc,setOpenFunc] = useState(false)

    const handleOpen = () => {
        setOpenFunc(!openFunc)
    }

    return (
    <div className={styles.music}>
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
        <button className={styles.function} onClick={handleOpen}>
            <img src="/img/music/function.svg" alt="function" />
        </button>
        {openFunc === true ? <MusicFunc  handleDelete={deleteMusic} id={musicData._id}/>:null}
    </div>
    )
}

export default Music