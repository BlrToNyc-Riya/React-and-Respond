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
}

export enum CourseActionTypes {
  CREATE_COURSE_REQUESTED = 'CREATE_COURSE_REQUESTED',
  CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR',
  CREATE_COURSE_INIT_SUCCESS = 'CREATE_COURSE_INIT_SUCCESS',
  CREATE_COURSE_ADD_COURSE_CONTENT = 'CREATE_COURSE_ADD_COURSE_CONTENT',
  CREATE_COURSE_RESET = 'CREATE_COURSE_RESET'
}

export interface CourseCreationErrorType {
  message: string
}
