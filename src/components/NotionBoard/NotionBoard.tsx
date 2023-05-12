import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './NotionBoard.module.css'

import { loadNotions } from '../../redux/notions/actions'
import { RootState } from '../../redux/store/store'
import { createNotion } from '../../services/notions'
import BoardItem from '../BoardItem/BoardItem'

type NotionBoardProps = {}

const NotionBoard: React.FC<NotionBoardProps> = () => {
  const notions = useSelector((state: RootState) => state.notions)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadNotions()(dispatch)
  }, [dispatch])

  const onClickCreateNotion = () => {
    createNotion()
      .then((notionId) => navigate(`/edit/${notionId}`))
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div>
      <h1 className={styles.heading}>
        Мои заметки
        <Button variant='contained' onClick={onClickCreateNotion}>
          Создать новую заметку
        </Button>
      </h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          {notions.data.map((notion) => {
            return (
              <Grid item xs={4} md={2} key={notion.id}>
                <BoardItem notion={notion} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}

export default NotionBoard
