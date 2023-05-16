import { Button, TextField } from '@mui/material'
import React from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './LoginForm.module.css'

import { useAuth } from '../../contexts/AuthContext'

type LoginFormProps = {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const { signup } = useAuth()
  const { signin } = useAuth()
  const navigate = useNavigate()

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const email = emailRef.current
    const password = passwordRef.current
    setError('')
    setLoading(true)
    signup(email, password)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleSignin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const email = emailRef.current
    const password = passwordRef.current
    signin(email, password)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error: Error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  return (
    <div className={styles.inputFormWrapper}>
      <form className={styles.inputForm}>
        <h1>Вход</h1>
        {error && <span className={styles.error}>Логин или пароль введены неверно</span>}
        <TextField
          placeholder='login'
          onChange={(event) => {
            emailRef.current = event.target.value
          }}
        ></TextField>
        <TextField
          placeholder='password'
          type='password'
          onChange={(event) => {
            passwordRef.current = event.target.value
          }}
        ></TextField>
        <div>
          <Button disabled={loading} onClick={(event) => handleSignin(event)}>
            Войти
          </Button>
          <Button disabled={loading} onClick={(event) => handleSignup(event)}>
            Зарегестрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
