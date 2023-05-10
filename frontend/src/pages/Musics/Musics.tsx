import Music from "../../components/Music/Music"
import Button from "../../components/UI/Button/Button"
import Title from "../../components/UI/Title/Title"
import { useGetMusicAllQuery } from "../../store/api/music.api"

import styles from "./Music.module.scss"

const Musics = () => {
    const {data, error, isLoading} = useGetMusicAllQuery("")

    if(isLoading) {
      return <h1>Загрузка</h1>
    }
  
    if(error){
      return <div>Что-то пошло не так</div>
    }
  return (
    <div>
        <div className={styles.titleBlock}>
            <div>
                <Title text="All music"/>
            </div>
            <div>
                <Button func={() => console.log("play music")} typeView="circle">
                    Play
                </Button>
            </div>
        </div>
        <div className={styles.musicBlock}>
            {data?.map(music => <Music key={music._id} musicData={music}/>)}
        </div>
    </div>
  )
}

export default Musics