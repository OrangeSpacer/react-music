import { IBurger } from "./Burger.props"
import { Link, useNavigate } from "react-router-dom"
import Button from "../UI/Button/Button"

import styles from "./Burger.module.scss"
import { useEffect } from "react"

const Burger = ({listLink}:IBurger): JSX.Element => {
    const navigate = useNavigate()

    const profileHandler = () => {
        navigate("/profile")
    }

    return (
    <div className={styles.burger}>
        <div className={styles.profile}>
            <Button func={profileHandler} typeView="rounded">
                profile
            </Button>
        </div>
        <div className={styles.links}>
            {listLink.map(link => 
                <Link to={link.link} key={link.text} className={styles.linkBlock}>
                    <img alt="linkLogo" src={link.imgLink} className={styles.imgLink}/>
                        {link.text}
                </Link>
            )}
        </div>
        <div className={styles.logoutBlock}>
            <div className={styles.logoutImgBlock}>
                <img src="img/burger/logout.svg" alt="logoutImg" className={styles.logoutImg} />
            </div>
            <div className={styles.logoutText}>
                Log out
            </div>
        </div>
    </div>
    )
}

export default Burger