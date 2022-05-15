export type CourseAction = {
  type: string
  payload?: string | CourseType
}

export type InputFieldType = {
  [key: string]: string
}

export type CourseType = {
  name: string
  authorId: number | string | undefined
  details: string
  tags: string
  error?: string
  courseContent: string
  courseOutcome: InputFieldType
}

export type CourseStateType = {
  data: CourseType
  error: string
  loading: boolean
  created: boolean
  stage: courseCreationStatus
}

export enum courseCreationStatus {
  COURSE_CREATION_STAGE_1 = "1",
  COURSE_CREATION_STAGE_2 = "2",
  COURSE_CREATION_STAGE_3 = "3"
}

export enum CourseActionTypes {
  CREATE_COURSE_REQUESTED = "CREATE_COURSE_REQUESTED",
  CREATE_COURSE_ERROR = "CREATE_COURSE_ERROR",
  CREATE_COURSE_INIT_SUCCESS = "CREATE_COURSE_INIT_SUCCESS",
  CREATE_COURSE_ADD_COURSE_CONTENT = "CREATE_COURSE_ADD_COURSE_CONTENT",
  CREATE_COURSE_RESET = "CREATE_COURSE_RESET",
  CREATE_COURSE_CHANGE_STAGE = "CREATE_COURSE_CHANGE_STAGE",
  CREATE_COURSE_RESET_INITIAL = "CREATE_COURSE_RESET_INITIAL",
  CREATE_COURSE_RESET_ERROR = "CREATE_COURSE_RESET_ERROR"
}

export interface CourseCreationErrorType {
  message: string
}

interface CreateCourseRequestedAction {
  type: CourseActionTypes.CREATE_COURSE_REQUESTED
}

interface CreateCourseErrorAction {
  type: CourseActionTypes.CREATE_COURSE_ERROR
  payload: string
}

interface CreateCourseInitSuccessAction {
  type: CourseActionTypes.CREATE_COURSE_INIT_SUCCESS
  payload: CourseType
}

interface CreateCourseAddCourseContentsAction {
  type: CourseActionTypes.CREATE_COURSE_ADD_COURSE_CONTENT
  payload: CourseType
}

interface CreateCourseResetAction {
  type: CourseActionTypes.CREATE_COURSE_RESET
}

interface CreateCourseResetInitialAction {
  type: CourseActionTypes.CREATE_COURSE_RESET_INITIAL
}
interface CreateCourseChangeStageAction {
  type: CourseActionTypes.CREATE_COURSE_CHANGE_STAGE
  payload: courseCreationStatus
}
interface CreateCourseResetErrorAction {
  type: CourseActionTypes.CREATE_COURSE_RESET_ERROR
}

export type CourseActionType =
  | CreateCourseRequestedAction
  | CreateCourseErrorAction
  | CreateCourseInitSuccessAction
  | CreateCourseAddCourseContentsAction
  | CreateCourseResetAction
  | CreateCourseChangeStageAction
  | CreateCourseResetInitialAction
  | CreateCourseResetErrorAction
