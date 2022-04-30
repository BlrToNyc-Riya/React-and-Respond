import {
  CourseActionTypes,
  CourseAction,
  CourseType,
  CourseCreationErrorType
} from './../CourseAction.types'
import { Dispatch } from 'redux'

export const createCourseAction = (course: CourseType) => {
  return async (dispatch: Dispatch<CourseAction>) => {
    dispatch({
      type: CourseActionTypes.CREATE_COURSE_REQUESTED
    })

    try {
      // const response = await fetch('http://localhost:5000/api/courses', {
      //   method: 'POST',
      //   body: JSON.stringify(course),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // const data = await response.json()

      dispatch({
        type: CourseActionTypes.CREATE_COURSE_INIT_SUCCESS,
        payload: course
      })
    } catch (error) {
      const typedError = error as Error
      dispatch({
        type: CourseActionTypes.CREATE_COURSE_ERROR,
        payload: typedError.message
      })
    }
  }
}
