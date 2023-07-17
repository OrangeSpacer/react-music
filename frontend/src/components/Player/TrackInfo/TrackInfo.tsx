import { ITrackInfo } from "./TrackInfo.interface"

import styles from "./TrackInfo.module.scss"

const TrackInfo = ({author,imgPath,title}:ITrackInfo) => {
  return (
    <div className={styles.trackInfo}>
        <div className={styles.trackimgBlock}>
          <img className={styles.imgTrack} src={"http://127.0.0.1:5000/"+imgPath}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.author}>
            {author}
          </div>
        </div>
      </div>
  )
}

export default TrackInfo