import Title from '../../components/UI/Title/Title'
import { useForm } from 'react-hook-form'
import { useLoginUserMutation, useRegisterUserMutation } from '../../store/api/user.api'
import Error from '../../components/Error/Error'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'

import cn from "classnames"
import styles from "./Login.module.scss"
import Button from '../../components/UI/Button/Button'
import { login } from '../../store/features/authSlice'

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
    const [loginUser,loginResponse] = useLoginUserMutation()
    const [registerUser,registerResponse] = useRegisterUserMutation()
    const [errorMessage,setErrorMessage] = useState<string>()
    const {register, handleSubmit, formState: {errors},getValues} = useForm<FormValues>();
    const dispatch = useAppDispatch()


    const onLogin = handleSubmit(() => {
        console.log(getValues())
        loginUser(getValues())
    })

    const onRegister = handleSubmit(() => {
        console.log(getValues())
        registerUser(getValues())
    })


    useEffect(() => {
        if(loginResponse.isSuccess){
            dispatch(login(loginResponse.data))
        }
        if(registerResponse.isSuccess){
            dispatch(login(registerResponse.data))
        }
    },[loginResponse.isSuccess,loginResponse.data,dispatch,registerResponse.isSuccess,registerResponse.data])

    
    useEffect(() => {
        if(loginResponse.isError){
            const error  = loginResponse.error as ErrorType
            setErrorMessage(error.data.message)
        }
    },[loginResponse.error,loginResponse.isError])

    useEffect(() => {
        if(registerResponse.isError){
            const error  = registerResponse.error as ErrorType
            setErrorMessage(error.data.message)
        }
    },[registerResponse.isError,registerResponse.error])

    return (
    <div className={styles.authorization}>
        <Title text='Авторизация/Регистрация' />
        <div className={styles.errorBlock}>
            {(loginResponse.isError || registerResponse.isError) && errorMessage ? <Error message={errorMessage}/>:null}
        </div>
        <form className={styles.form}>
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
            <Button func={onLogin} typeView='rounded'>
                login
            </Button>
            <Button func={onRegister} typeView='rounded'>
                registration
            </Button>
            </div>
        </form>
    </div>
    )
}

export default Login