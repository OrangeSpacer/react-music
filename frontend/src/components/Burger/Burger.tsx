import Button from "../UI/Button/Button"
import { IBurger } from "./Burger.props"

import styles from "./Burger.module.scss"

const Burger = ({listLink}:IBurger): JSX.Element => {
  return (
    <div>
        <div>
            <Button func={() => console.log("Hello world")} typeView="rounded">
                profile
            </Button>
        </div>
        <div>
            {listLink.map(link => 
                <div id={link.text} className={styles.linkBlock}>
                    <a href={link.link} className={styles.link}>
                        {link.text}
                    </a>
                </div>
            )}
        </div>
    </div>
  )
}

export default Burger