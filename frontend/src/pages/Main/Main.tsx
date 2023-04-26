import React from 'react'
import Burger from '../../components/Burger/Burger'
import Content from '../Content/Content'
import Player from '../../components/Player/Player'


import style from "./Main.module.scss";

const Main = () => {
  return (
    <div className={style.mainBlock}>
        <div className={style.burger}>
            <Burger listLink={[]}/>
        </div>
        <div className={style.content}>
            <Content/>
        </div>
        <div className={style.player}>
            <Player/>
        </div>
    </div>
  )
}

export default Main