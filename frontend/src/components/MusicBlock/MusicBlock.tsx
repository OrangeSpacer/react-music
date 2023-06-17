import Title from '../UI/Title/Title'
import { IMusicBlock } from './MusicBlock.props'
import Music from '../Music/Music'

import styles from "./MusicBlock.module.scss"

const MusicBlock = ({musics,title,addInPlaylist,deleteInPlaylist,deleteMusic}: IMusicBlock) => {
  return (
    <div>
        <div className={styles.titleBlock}>
            <Title text={title}/>
        </div>
        <div className={styles.musicBlock}>
            {musics.map(music => <Music key={music._id} musicData={music} addInPlaylist={addInPlaylist} deleteInPlaylist={deleteInPlaylist} deleteMusic={deleteMusic}/>)}
        </div>
    </div>
  )
}

export default MusicBlock