import { Dispatch } from 'redux'

import { Action, Notion } from '../../models'

import { getNotions, deleteNotion } from '../../services/notions'

export const LOAD_NOTIONS = 'LOAD_NOTIONS'
export const LOAD_NOTIONS_FAILURE = 'LOAD_NOTIONS_FAILURE'
export const LOAD_NOTIONS_SUCCESS = 'LOAD_NOTIONS_SUCCESS'
export const DELETE_NOTIONS_SUCCESS = 'DELETE_NOTIONS_SUCCESS'

type LoadNotionsAction = Action
type LoadNotionsFailureAction = Action
type LoadNotionsSuccessAction = Action<Notion[]>
type DeleteNotionsSuccessAction = Action<string>

export type ActionTypes =
  | LoadNotionsAction
  | LoadNotionsFailureAction
  | LoadNotionsSuccessAction
  | DeleteNotionsSuccessAction

export const loadNotionsAction = () => {
  return { type: LOAD_NOTIONS }
}

export const loadNotionsFailureAction = () => {
  return { type: LOAD_NOTIONS_FAILURE }
}

export const loadNotionsSuccess = (payload: Notion[]) => {
  return { type: LOAD_NOTIONS_SUCCESS, payload }
}

export const deleteNotionsSuccess = (payload: string) => {
  return { type: DELETE_NOTIONS_SUCCESS, payload }
}

export const deleteNotionAction = (notionId: string) => {
  return (dispatch: Dispatch) => {
    deleteNotion(notionId)
      .then(() => {
        dispatch(deleteNotionsSuccess(notionId))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const loadNotions = () => {
  return (dispatch: Dispatch) => {
    dispatch(loadNotionsAction())
    getNotions()
      .then((response) => {
        dispatch(loadNotionsSuccess(response))
      })
      .catch(() => {
        dispatch(loadNotionsFailureAction())
      })
  }
}
