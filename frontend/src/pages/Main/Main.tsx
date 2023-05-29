import Burger from '../../components/Burger/Burger'
import Player from '../../components/Player/Player'


import style from "./Main.module.scss";
import { Outlet } from 'react-router-dom';

const Main = () => {
  const burgerLinks = [
    {
      text: "favorites",
      link: "/favorites",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "playlists",
      link: "/playlists",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "your playlists",
      link: "/playlists/local",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "music",
      link: "/music",
      imgLink: "/img/burger/music.svg"
    },
    {
      text: "your music",
      link: "/music/local",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "create playlist",
      link: "/create/playlist",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "create music",
      link: "/create/music",
      imgLink: "/img/burger/favorites.svg"
    }
  ]
  return (
    <div className={style.mainBlock}>
        <div className={style.burger}>
            <Burger listLink={burgerLinks}/>
        </div>
        <div className={style.content}>
            <Outlet/>
        </div>
        <div className={style.player}>
            <Player/>
        </div>
    </div>
  )
}

export default Main