import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { NotionState } from '../notion/reducer'
import { NotionsState } from '../notions/reducer'
import reducer from '../rootReducer'

export type RootState = {
  notions: NotionsState
  notion: NotionState
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store
