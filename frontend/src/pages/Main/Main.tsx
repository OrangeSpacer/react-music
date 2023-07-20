import { useState } from 'react';
import Burger from '../../components/Burger/Burger'
import Player from '../../components/Player/Player'


import cn from "classnames"
import style from "./Main.module.scss";
import { Outlet } from 'react-router-dom';

const Main = () => {
  const [burgerOpen,setBurgerOpen] = useState<boolean>(false)
  const burgerLinks = [
    {
      text: "favorites",
      link: "/favorites",
      imgLink: "/img/burger/favorites.svg"
    },
    {
      text: "playlists",
      link: "/playlists/all",
      imgLink: "/img/burger/playlist.svg"
    },
    {
      text: "your playlists",
      link: "/playlists/local",
      imgLink: "/img/burger/yourPlaylist.svg"
    },
    {
      text: "music",
      link: "/music",
      imgLink: "/img/burger/music.svg"
    },
    {
      text: "your music",
      link: "/music/local",
      imgLink: "/img/burger/yourMusic.svg"
    },
    {
      text: "create playlist",
      link: "/create/playlist",
      imgLink: "/img/burger/createPlaylist.svg"
    },
    {
      text: "create music",
      link: "/create/music",
      imgLink: "/img/burger/createMusic.svg"
    }
  ]

  const handleOpenBurgerMenu = () => {
    setBurgerOpen(true)
  }

  const handleCloseBurger = () => {
    setBurgerOpen(false)
  }

  return (
    <div className={style.mainBlock}>
        <div className={style.burgerBtn}>
          {burgerOpen ? <img src="/img/burger/closeBtn.svg" alt="close" onClick={handleCloseBurger}/>:<img src="/img/burger/burgerBtn.svg" onClick={handleOpenBurgerMenu} alt="open"/>}
        </div>
        <div className={cn(style.burger, {
          [style.burgerMenuOpen]: burgerOpen == true
        })}>
            <Burger closeBurgerMenu={handleCloseBurger} listLink={burgerLinks}/>
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