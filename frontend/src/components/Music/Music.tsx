import Button from '../UI/Button/Button'
import { IMusic } from './Music.props'

import styles from "./Music.module.scss"

const Music = ({musicData}:IMusic) => {
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
        <button className={styles.function}>
            <img src="img/music/function.svg" alt="function" />
        </button>
    </div>
  )
}

export default Music