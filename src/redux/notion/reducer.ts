import { LOAD_NOTION, LOAD_NOTION_FAILURE, LOAD_NOTION_SUCCESS, ActionTypes } from './actions'

import { Notion } from '../../models'

export type NotionState = {
  loading: boolean
  data: Notion | null
}

const defaultState: NotionState = {
  loading: false,
  data: null,
}

const reducer = (state: NotionState = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case LOAD_NOTION: {
      return {
        loading: true,
        data: null,
      }
    }

    case LOAD_NOTION_FAILURE: {
      return {
        loading: false,
        data: null,
      }
    }

    case LOAD_NOTION_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
