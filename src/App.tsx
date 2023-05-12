import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import withHeader from './hoc/withHeader'
import Login from './pages/Login'
import NotionEditPage from './pages/NotionEditPage'
import NotionPage from './pages/NotionPage'
import Notions from './pages/Notions'

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const { currentUser } = useAuth()

  const withLogin = (page: React.ReactNode) => {
    return currentUser ? page : <Navigate to='/login' replace />
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={withLogin(withHeader(<Notions />))} />
        <Route path='/:notion_id' element={withHeader(<NotionPage />)} />
        <Route path='edit/:notion_id' element={withLogin(withHeader(<NotionEditPage />))} />
      </Routes>
    </Router>
  )
}

export default App
