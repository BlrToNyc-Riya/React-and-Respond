import {
  CourseAction,
  CourseType,
  CourseStateType,
  CourseActionTypes,
  courseCreationStatus,
  CourseActionType
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
  created: false,
  stage: courseCreationStatus.COURSE_CREATION_STAGE_1
}
export const courseReducer = (
  state: CourseStateType = defaultState,
  action: CourseActionType
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
      const courseData = action.payload
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
    case CourseActionTypes.CREATE_COURSE_CHANGE_STAGE:
      const data = action
      return {
        ...state,
        stage: action.payload
      }
    case CourseActionTypes.CREATE_COURSE_RESET:
      return { ...defaultState, created: true }
    case CourseActionTypes.CREATE_COURSE_RESET_INITIAL:
      return { ...state, created: false }
    case CourseActionTypes.CREATE_COURSE_RESET_ERROR:
      return { ...defaultState }
    default:
      return state
  }
}
