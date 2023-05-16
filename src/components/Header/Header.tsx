import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

import { ReactComponent as Logo } from '../../assets/notebook.svg'

import { useAuth } from '../../contexts/AuthContext'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  const { currentUser, signout } = useAuth()

  return (
    <div className={styles.header}>
      <NavLink to='/' className={styles.link}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
          <h1>VaultNote</h1>
        </div>
      </NavLink>
      {currentUser && (
        <Button
          variant='outlined'
          onClick={() => {
            signout()
          }}
        >
          Выйти
        </Button>
      )}
    </div>
  )
}

export default Header
