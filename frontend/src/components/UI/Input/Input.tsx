import { IInput } from './Input.props'
import cn from "classnames"

import styles from "./Input.module.scss"

const Input = ({errors,type,inputText,placeholder,required,register}: IInput) => {
  return (
    <label className={styles.label}>
        <div className={styles.descr}>{inputText}</div>
        <input required={required} id='email' placeholder={placeholder} type={type} className={cn(styles.input,{[styles.errorInput]: errors})} {...register}/>
        {errors && <span className={styles.error}>{errors}</span>}
    </label>
  )
}

export default Input