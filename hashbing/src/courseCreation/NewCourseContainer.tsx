import React, { useEffect } from 'react'
import { ClipboardCheckIcon } from '@heroicons/react/solid'
import Button from '../Components/Button'
import NewCourseInit from './NewCourseInit'
import { useSelector } from 'react-redux'
import { Store } from '../store'
import { defaultState } from '../reducers/courseReducer'
import NewCourseWizard from './NewCourseWizard'
import { Navigate, useNavigate } from 'react-router-dom'
import NewCourseFeedback from './NewCourseFeedback'
import { isEmpty } from 'lodash'
import CourseCreationConfirmation from './CourseCreationConfirmation'
import Loader from '../Components/Utilities/Loader'
import {
  CourseActionTypes,
  courseCreationStatus
} from '../actions/types/CourseAction.types'

type Props = {}

function NewCourseContainer ({}: Props): React.ReactElement {
  const { courses } = useSelector((state: Store) => state)
  const navigate = useNavigate()

  const renderLoader = (): React.ReactNode => {
    if (courses.loading) {
      return <Loader />
    } else return null
  }
  const renderCourseCreator = (): React.ReactNode => {
    console.log('course', courses.created)
    if (courses.loading) {
      return null
    } else if (courses.error)
      return (
        <p>
          OOPS an error occured while creating the course. Please try again
          later
        </p>
      )
    else if (
      (courses.stage === courseCreationStatus.COURSE_CREATION_STAGE_1 ||
        courses.created) &&
      courses.data.name === ''
    ) {
      return <NewCourseInit />
    }
    // else if (courses.created) {
    //   return <CourseCreationConfirmation />
    // }
    else if (
      courses.stage === courseCreationStatus.COURSE_CREATION_STAGE_3 &&
      !courses.created
    ) {
      return <NewCourseFeedback />
    } else return <NewCourseWizard />
  }

  return (
    <div className='h-full'>
      {renderLoader()}
      {renderCourseCreator()}
    </div>
  )
}

export default NewCourseContainer
