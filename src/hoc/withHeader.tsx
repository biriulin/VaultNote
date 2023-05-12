import { ReactNode } from 'react'

import styles from './withHeader.module.css'

import Header from '../components/Header/Header'

const withHeader = (page: ReactNode) => {
  return (
    <main>
      <Header />
      <div className={styles.page}>{page}</div>
    </main>
  )
}

export default withHeader
