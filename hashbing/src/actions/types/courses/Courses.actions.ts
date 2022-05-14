import {
  CourseActionTypes,
  CourseAction,
  CourseType,
  CourseCreationErrorType,
  courseCreationStatus
} from './../CourseAction.types'
import { Dispatch } from 'redux'
import axios from 'axios'
import { createToken } from '../../../firebase'

export const createCourseAction = (
  course: CourseType,
  status: courseCreationStatus
) => {
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
      console.log('dispatching change status', status)
      dispatch({
        type: CourseActionTypes.CREATE_COURSE_CHANGE_STAGE,
        payload: status
      })

      dispatch({
        type: CourseActionTypes.CREATE_COURSE_RESET_INITIAL
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

export const createCourseAddActionAction = (
  course: CourseType,
  stage: courseCreationStatus,
  submit = false
) => {
  return async (dispatch: Dispatch<CourseAction>) => {
    dispatch({
      type: CourseActionTypes.CREATE_COURSE_REQUESTED
    })

    try {
      if (submit) {
        const header = await createToken()
        const { data } = await axios.post(
          'http://localhost:4000/courses/create',
          {
            title: course.name,
            body: course.courseContent,
            description: course.details,
            courseOutcome: course.courseOutcome,
            topicsTagged: course.tags
          },
          header
        )
      }

      // const data = await response.json()

      dispatch({
        type: CourseActionTypes.CREATE_COURSE_ADD_COURSE_CONTENT,
        payload: course
      })
      if (submit)
        dispatch({
          type: CourseActionTypes.CREATE_COURSE_RESET
        })
      dispatch({
        type: CourseActionTypes.CREATE_COURSE_CHANGE_STAGE,
        payload: stage
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
