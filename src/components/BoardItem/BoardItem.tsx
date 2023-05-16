import { Button, CardActionArea, CardActions } from '@mui/material'
import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

import styles from './BoardItem.module.css'

import { Notion } from '../../models'

import { deleteNotionAction } from '../../redux/notions/actions'

type BoardItemProps = {
  notion: Notion
}

const BoardItem: React.FC<BoardItemProps> = ({ notion }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onClickDeleteNotion = () => {
    deleteNotionAction(notion.id)(dispatch)
  }

  return (
    <Card sx={{ height: '150px' }}>
      <NavLink to={`/${notion.id}`} className={styles.link}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {notion.title || 'Замтека'}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {notion.description || 'Описание'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NavLink>
      <CardActions className={styles.buttons}>
        <Button
          size='small'
          onClick={() => {
            navigate(`/edit/${notion.id}`)
          }}
        >
          Edit
        </Button>
        <Button size='small' onClick={onClickDeleteNotion}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default BoardItem
