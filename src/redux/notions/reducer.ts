import {
  LOAD_NOTIONS,
  LOAD_NOTIONS_FAILURE,
  LOAD_NOTIONS_SUCCESS,
  DELETE_NOTIONS_SUCCESS,
  ActionTypes,
} from './actions'

import { Notion } from '../../models'

export type NotionsState = {
  loading: boolean
  data: Notion[]
}

const defaultState: NotionsState = {
  loading: false,
  data: [],
}

const reducer = (state: NotionsState = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case LOAD_NOTIONS: {
      return {
        loading: true,
        data: [],
      }
    }

    case LOAD_NOTIONS_FAILURE: {
      return {
        loading: false,
        data: [],
      }
    }

    case LOAD_NOTIONS_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
      }
    }

    case DELETE_NOTIONS_SUCCESS: {
      return {
        loading: false,
        data: state.data.filter((notion) => {
          return notion.id !== action.payload
        }),
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
