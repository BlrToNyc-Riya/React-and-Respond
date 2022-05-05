import {
  CourseAction,
  CourseType,
  CourseStateType,
  CourseActionTypes
} from './../actions/types/CourseAction.types'

export const defaultState: CourseStateType = {
  data: { name: 'Q', authorId: 0, details: '', tags: [] },
  loading: false,
  error: ''
}
export const courseReducer = (
  state: CourseStateType = defaultState,
  action: CourseAction
): CourseStateType => {
  switch (action.type) {
    case CourseActionTypes.CREATE_COURSE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case CourseActionTypes.CREATE_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload as string
      }
    case CourseActionTypes.CREATE_COURSE_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as CourseType,
        error: ''
      }
    default:
      return state
  }
}
