import { IError } from './Error.props'

import styles from "./Error.module.scss"

const Error = ({message}: IError) => {
  return (
    <div className={styles.error}>
        {message}
    </div>
  )
}

export default Error