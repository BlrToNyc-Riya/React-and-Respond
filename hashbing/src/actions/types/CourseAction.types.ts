export type CourseAction = {
  type: string
  payload?: string | CourseType
}

export type CourseType = {
  name: string
  authorId: number
  details: string
  tags: string[]
  error?: string
}

export type CourseStateType = {
  data: CourseType
  error: string
  loading: boolean
}

export enum CourseActionTypes {
  CREATE_COURSE_REQUESTED = 'CREATE_COURSE_REQUESTED',
  CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR',
  CREATE_COURSE_INIT_SUCCESS = 'CREATE_COURSE_INIT_SUCCESS'
}

export interface CourseCreationErrorType {
  message: string
}
