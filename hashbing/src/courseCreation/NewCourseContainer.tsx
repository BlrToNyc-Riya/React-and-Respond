import React, { useEffect } from 'react'
import { ClipboardCheckIcon } from '@heroicons/react/solid'
import Button from '../Components/Button'
import NewCourseInit from './NewCourseInit'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../store'
import { defaultState } from '../reducers/courseReducer'
import NewCourseWizard from './NewCourseWizard'
import { Navigate, useNavigate } from 'react-router-dom'
import NewCourseFeedback from './NewCourseFeedback'
import { isEmpty } from 'lodash'
import CourseCreationConfirmation from './CourseCreationConfirmation'

type Props = {}

function NewCourseContainer ({}: Props): React.ReactElement {
  const { courses } = useSelector((state: Store) => state)
  const navigate = useNavigate()

  const renderLoader = (): React.ReactNode => {
    if (courses.loading) {
      return <div>Loading...</div>
    } else return null
  }
  const renderCourseCreator = (): React.ReactNode => {
    if (courses.loading) {
      return null
    }
    if (courses.data.name === '') {
      return <NewCourseInit />
    } else if (!isEmpty(courses.data.courseOutcome)) {
      return <CourseCreationConfirmation />
    } else if (courses.data.courseContent.length > 0) {
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
