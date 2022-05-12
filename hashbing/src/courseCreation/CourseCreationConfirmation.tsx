import React, { useEffect, useState } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'

export default () => {
  const { width, height } = useWindowSize()
  const [popper, setpopper] = useState(true)
  useEffect(() => {
    setTimeout(() => setpopper(false), 3000)
    return clearTimeout()
  }, [])
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
