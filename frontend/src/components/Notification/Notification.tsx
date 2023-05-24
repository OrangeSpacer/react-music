import { INotification } from './Notification.props'

import cn from "classnames"
import styles from "./Notification.module.scss"

const Notification = ({message, type}: INotification) => {
  return (
    <div className={cn(styles.block,{
      [styles.error]: type == "error",
      [styles.success]: type == "success",
      [styles.warn]: type == "warn"
    })}>
        {message}
    </div>
  )
}

export default Notification