import {
  CourseAction,
  CourseType,
  CourseStateType,
  CourseActionTypes
} from './../actions/types/CourseAction.types'

export const defaultState: CourseStateType = {
  data: {
    name: '',
    authorId: 0,
    details: '',
    tags: '',
    courseContent: '',
    courseOutcome: {}
  },
  loading: false,
  error: '',
  created: false
}
export const courseReducer = (
  state: CourseStateType = defaultState,
  action: CourseAction
): CourseStateType => {
  switch (action.type) {
    case CourseActionTypes.CREATE_COURSE_REQUESTED:
      return {
        ...state,
        loading: true,
        created: false
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
    case CourseActionTypes.CREATE_COURSE_ADD_COURSE_CONTENT:
      const courseData = action.payload as CourseType
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          courseContent: courseData.courseContent,
          courseOutcome: courseData.courseOutcome
        },
        error: ''
      }
    case CourseActionTypes.CREATE_COURSE_RESET:
      console.log({ ...defaultState, created: true })
      return { ...defaultState, created: true }
    default:
      return state
  }
}
