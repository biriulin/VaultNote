import { combineReducers } from 'redux'

import notion from './notion/reducer'
import notions from './notions/reducer'

export default combineReducers({
  notions,
  notion,
})
