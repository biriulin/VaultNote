import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { TRANSFORMERS, $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { Button, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import './NotionEdit.css'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import ExampleTheme from './themes/ExampleTheme'

import { useAuth } from '../../contexts/AuthContext'

import { loadNotion } from '../../redux/notion/actions'
import { NotionState } from '../../redux/notion/reducer'
import { RootState } from '../../redux/store/store'

import { editNotion } from '../../services/notions'

function Placeholder() {
  return <div className='editor-placeholder'>Enter some rich text...</div>
}

const editorConfig = {
  theme: ExampleTheme,
  namespace: 'Demo',
  onError(error: Error) {
    throw error
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

type NotionEditProps = {}

const NotionEdit: React.FC<NotionEditProps> = () => {
  const notionId = useParams().notion_id
  const notionState: NotionState = useSelector((state: RootState) => state.notion)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [markdown, setMarkdown] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    notionId && loadNotion(notionId)(dispatch)
  }, [notionId, dispatch])

  useEffect(() => {
    setTitle(notionState.data?.title || '')
    setDescription(notionState.data?.description || '')
  }, [notionState.data])

  const notionSave = () => {
    if (!notionId) {
      return
    }

    editNotion(notionId, title, markdown, description)
      .then(() => {
        navigate(`/${notionId}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onChange = (editorState: any) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS)
      setMarkdown(markdown)
    })
  }

  if (notionState.loading) {
    return <CircularProgress color='success' />
  }

  if (!notionState.data) {
    return <h1>Заметка не найдена</h1>
  }

  if (currentUser.uid !== notionState.data?.user) {
    navigate('/')
  }

  const editorState = () => $convertFromMarkdownString(notionState.data?.src || markdown, TRANSFORMERS)

  return (
    <div className='page'>
      <LexicalComposer initialConfig={{ ...editorConfig, editorState }}>
        <div className='editor-container'>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            className='input'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></TextField>
          <TextField
            id='outlined-basic'
            label='Description'
            variant='outlined'
            className='input'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></TextField>
          <ToolbarPlugin />
          <div className='editor-inner'>
            <RichTextPlugin
              contentEditable={<ContentEditable className='editor-input' />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <OnChangePlugin onChange={onChange} />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
        <div className='save-button'>
          <Button onClick={notionSave} variant='contained'>
            Сохранить
          </Button>
        </div>
      </LexicalComposer>
    </div>
  )
}

export default NotionEdit
