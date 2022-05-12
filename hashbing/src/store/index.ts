import rootReducers from './../reducers/'
import { applyMiddleware, createStore } from 'redux'
import reduxthunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(reduxthunk))
)

export type Store = ReturnType<typeof rootReducers>

export default store
