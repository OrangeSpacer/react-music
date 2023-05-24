import { useEffect, useState } from 'react'
import Input from '../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import Button from '../../components/UI/Button/Button'
import { useCreateTrackMutation } from '../../store/api/music/music.api'
import Title from '../../components/UI/Title/Title'
import Notification from '../../components/Notification/Notification'

import styles from "./CreateMusic.module.scss"
import FileInput from '../../components/UI/FileInput/FileInput'

type FormValues = {
    title: string,
	author: string,
	creator: string,
	image: string,
	track: string,
	_id: string,
}

interface ErrorType {
    status: number,
    data: {
        message: string
    }
}

const CreateMusic = () => {
    const [createTrack, res] = useCreateTrackMutation()
    const [errorMessage,setErrorMessage] = useState<string>()
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<FormValues>()
    
    const onCreate = handleSubmit(() => {
        handleClick()
    })

    const handleClick = () => {
        const formData = new FormData()
        formData.append("title", getValues().title)
        formData.append("author", getValues().author)
        formData.append("image", getValues().image[0])
        formData.append("track", getValues().track[0])
        createTrack(formData)
    }
    

    useEffect(() => {
        if(res.isError) {
            const error = res.error as ErrorType
            setErrorMessage(error.data.message)
        }
    },[res.isError,res.error])

    return (
    <div className={styles.content}>
        <Title text='Create music'/>
        {res.isError && errorMessage ? 
        <div className={styles.message}>
            <Notification message={errorMessage} type='error'/>
        </div>: null}
        {res.isSuccess ? 
        <div className={styles.message}>
            <Notification message="Track is success" type='success'/>
        </div>:
        null}
        <form className={styles.form}>
            <Input
                required = {true}
                errors={errors.title?.message as string}
                register={register("title",{required: "This field is required"})}
                type='text'
                inputText='Title'
                placeholder='Title'
            />
            <Input
                required = {true}
                errors={errors.author?.message as string}
                register={register("author",{required: "This field is required"})}
                type='text'
                inputText='Author'
                placeholder='Author'
            />
            <FileInput
                required = {true}
                errors={errors.image?.message as string}
                register={register("image",{required: "This field is required"})}
                fileType='image/*'
                inputText='Image'
                placeholder='Image'
            />
            <FileInput
                required = {true}
                errors={errors.track?.message as string}
                register={register("track",{required: "This field is required"})}
                fileType='audio/*'
                inputText='Music'
                placeholder='Music'
            />
            <Button typeView='rounded' func={onCreate}>
                Create
            </Button>
        </form>
    </div>
  )
}

export default CreateMusic