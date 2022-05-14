import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { BE_URL } from '../Components/Utilities/api.helper'
import ErrorBoundaries from '../Components/Utilities/ErrorBoundaries'
import { createToken } from '../firebase'

type courseDetailType = {
  title: string
  description: string
  courseOutcome: { [key: string]: string }
  author: string
  topicsTagged: [string]
  _id: string
  body: string
}

function NewCourse () {
  const { id } = useParams()
  const [course, setCourse] = useState<courseDetailType>()
  const [error, setError] = useState(false)
  useEffect(() => {
    async function getCourseData () {
      const header = await createToken()
      try {
        const { data } = await axios.get(
          `http://localhost:4000/courses/user/enrolled/${id}`,
          header
        )
        setCourse(data)
      } catch (error) {
        setError(true)
      }
    }
    getCourseData()
  }, [])
  if (error)
    return (
      <h1 className='flex items-center justify-center h-screen'>
        OOPS an error occured. Please try again after enrolling for the course
      </h1>
    )

  console.log('course>>', course)
  return !_.isEmpty(course) ? (
    <div className='flex items-center justify-center'>
      <ErrorBoundaries>
        <ReactQuill value={course?.body} readOnly={true} theme={'bubble'} />
      </ErrorBoundaries>
    </div>
  ) : null
}

export default NewCourse
