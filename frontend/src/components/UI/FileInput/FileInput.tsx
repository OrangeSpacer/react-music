import { IFileInput } from './Fileinput.props'

import styles from './FileInput.module.scss'


const FileInput = ({errors,fileType,register,required,inputText,placeholder}:IFileInput) => {
  return (
    <label className={styles.label}>
    <div className={styles.descr}>{inputText}</div>
    <input accept={fileType} required={required} id='email' placeholder={placeholder} type="file" className={styles.input} {...register}/>
    {errors && <span className={styles.error}>{errors}</span>}
</label>
  )
}

export default FileInput