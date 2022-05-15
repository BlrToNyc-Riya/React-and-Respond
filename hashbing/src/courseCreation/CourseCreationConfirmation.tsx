import React, { useEffect, useState } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Button from '../Components/Button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Store } from '../store'
import Loader from '../Components/Utilities/Loader'
import { courseCreationStatus } from '../actions/types/CourseAction.types'

export default () => {
  const { width, height } = useWindowSize()
  const [popper, setpopper] = useState(true)
  useEffect(() => {
    setTimeout(() => setpopper(false), 3000)
    return clearTimeout()
  }, [])
  const { courses } = useSelector((state: Store) => state)
  console.log('here in confirmation page', courses)
  if (!courses.created && courses.data.name.length === 0)
    return <Navigate to='/' replace />
  if (courses.error) return <Navigate to='/courses/new' replace />
  if (courses.loading || !courses.created) return <Loader />

  return (
    <div className='flex flex-col items-center justify-center h-3/4'>
      <h1>Congrats on creating this course.</h1>
      <h1>You will soon be able to find it published on the courses section</h1>
      <Link to='/'>
        <Button name='Navigate to home' />
      </Link>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={popper ? 100 : 0}
      />
    </div>
  )
}
