import { useForm } from 'react-hook-form'
import Title from '../../components/UI/Title/Title'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useCreatePlaylistMutation } from '../../store/api/playlist/playlist.api'

import styles from "./CreatePlaylist.module.scss"
import { useEffect, useState } from 'react'
import Notification from '../../components/Notification/Notification'


type FormValues = {
    title: string
}

interface ErrorType {
    status: number,
    data: {
        message: string
    }
}

const CreatePlaylist = () => {
    const [createPlaylist,res] = useCreatePlaylistMutation()
    const [error,setError] = useState("")
    const {register,handleSubmit,getValues} = useForm<FormValues>()

    const onCreate = () => {
        createPlaylist(getValues())
    }

    useEffect(() => {
        if(res.isError) {
            const error = res.error as ErrorType
            setError(error.data.message)
        }
    },[res.isError,res.error])

  return (
    <div className={styles.playlistBlock}>
        <div>
            <Title text='Create playlist'/>
        </div>
        <div>
            <form onSubmit={handleSubmit(onCreate)} className={styles.form}>
                {res.isError && error ?         
                    <div className={styles.notification}>
                        <Notification message={error} type='error'/>
                    </div>:
                    null
                }
                {
                    res.isSuccess ? 
                    <div className={styles.notification}>
                        <Notification message="Playlist created successfully" type='success'/>
                    </div>:
                    null
                }
                <Input
                type='text'
                required={true}
                placeholder='title'
                register={register("title",{required: "This field is required"})}
                inputText='Title'
                errors=''/>
                <div className={styles.btnBlock}>
                    <Button typeView='rounded'>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreatePlaylist