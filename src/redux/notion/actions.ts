import { Dispatch } from 'redux'

import { Notion, Action } from '../../models'
import { getNotion } from '../../services/notions'

export const LOAD_NOTION = 'LOAD_NOTION'
export const LOAD_NOTION_FAILURE = 'LOAD_NOTION_FAILURE'
export const LOAD_NOTION_SUCCESS = 'LOAD_NOTION_SUCCESS'

type LoadNotionAction = Action
type LoadNotionSuccessAction = Action<Notion>
type LoadNotionFailureAction = Action

export type ActionTypes = LoadNotionAction | LoadNotionSuccessAction | LoadNotionFailureAction

export const loadNotionAction = () => {
  return { type: LOAD_NOTION }
}

export const loadNotionFailureAction = () => {
  return { type: LOAD_NOTION_FAILURE }
}

export const loadNotionSuccess = (payload: Notion) => {
  return { type: LOAD_NOTION_SUCCESS, payload }
}

export const loadNotion = (notionId: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(loadNotionAction())
    getNotion(notionId)
      .then((response) => {
        dispatch(loadNotionSuccess(response))
      })
      .catch((error) => {
        dispatch(loadNotionFailureAction())
      })
  }
}
