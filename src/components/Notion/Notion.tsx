import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

import styles from './Notion.module.css'

import { loadNotion } from '../../redux/notion/actions'
import { NotionState } from '../../redux/notion/reducer'

import { RootState } from '../../redux/store/store'

type NotionViewerProps = {}

const NotionViewer: React.FC<NotionViewerProps> = () => {
  const notionId = useParams().notion_id
  const notionState: NotionState = useSelector((state: RootState) => state.notion)
  const dispatch = useDispatch()

  useEffect(() => {
    notionId && loadNotion(notionId)(dispatch)
  }, [notionId, dispatch])

  if (notionState.loading) {
    return <CircularProgress color='success' />
  }

  if (!notionState.data) {
    return <h1>Заметка не найдена</h1>
  }

  return (
    <div className={styles.content}>
      <h1>{notionState.data?.title}</h1>
      <ReactMarkdown
        children={notionState.data?.src as string}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                style={dracula}
                language={match[1]}
                PreTag='div'
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
        }}
      ></ReactMarkdown>
    </div>
  )
}

export default NotionViewer
