import { courseReducer } from './courseReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
  courses: courseReducer
})

export default rootReducers
