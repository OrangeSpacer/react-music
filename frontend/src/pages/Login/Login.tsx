import Title from '../../components/UI/Title/Title'
import { useForm } from 'react-hook-form'

import cn from "classnames"
import styles from "./Login.module.scss"
import Button from '../../components/UI/Button/Button'
import { useLoginUserMutation } from '../../store/api/user.api'
import Error from '../../components/Error/Error'
import { useEffect, useState } from 'react'

type FormValues = {
    email: string
    password: string
}

interface ErrorType {
    status: number,
    data: {
        message: string
    }
}

const Login = () => {
    const [loginUser,response] = useLoginUserMutation()
    const [errorMessage,setErrorMessage] = useState<string>()
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const onSubmit = handleSubmit((data) => {
        loginUser(data)
    })
    if(response.isSuccess){
        console.log(response.data)
    }
    useEffect(() => {
        if(response.isError){
            const error  = response.error as ErrorType
            setErrorMessage(error.data.message)
        }
    },[response.error,response.isError])

    return (
    <div className={styles.authorization}>
        <Title text='Авторизация/Регистрация' />
        <div className={styles.errorBlock}>
            {response.isError && errorMessage ? <Error message={errorMessage}/>:null}
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>
                <div className={styles.descr}>Email</div>
                <input id='email' placeholder='email' type='email' className={cn(styles.input,{[styles.errorInput]: errors.email})} {...register("email",{
                    required: "This field is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })}/>
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </label>
            <label className={styles.label}>
                <div className={styles.descr}>Password</div>
                <input className={cn(styles.input,{[styles.errorInput]: errors.password})} placeholder='password' {...register("password",{required: "This field is required"})}/>
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </label>
            <div className={styles.loginBtns}>
            <Button func={onSubmit} typeView='rounded'>
                submit
            </Button>
            <Button func={onSubmit} typeView='rounded'>
                registration
            </Button>
            </div>
        </form>
    </div>
    )
}

export default Login