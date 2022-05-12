import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

function CourseForm () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [courseOutcome1, setCourseOutcome1] = useState('')
  const [courseOutcome2, setCourseOutcome2] = useState('')
  const [courseOutcome3, setCourseOutcome3] = useState('')
  const [courseOutcome4, setCourseOutcome4] = useState('')

  const addCourse = (e: React.FormEvent<HTMLFormElement>) => {
    let password_err2 = document.getElementById('password__err2')
    if (password_err2 !== null) {
      password_err2.style.display = 'none'
    }
    const url = 'http://localhost:4000/courses/signin'
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     courseOutcome1,
    //     courseOutcome2,
    //     courseOutcome3,
    //     courseOutcome4,
    //   }),
    // };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        courseOutcome1,
        courseOutcome2,
        courseOutcome3,
        courseOutcome4
      }),
      credentials: 'include'
    })
      .then(response => {
        if (response.ok == true) navigate('/')
        else {
          if (password_err2 !== null) {
            password_err2.style.display = 'flex'
            response.text().then(text => {
              setError(text)
            })
          }
        }
      })
      .catch(error => {
        setError(error.message)
        if (password_err2 !== null) {
          password_err2.style.display = 'flex'
        }
      })
  }
  return (
    <div className='flex bg-white w-screen rounded-2xl'>
      <div className='flex flex-col w-full h-full rounded-2xl'>
        {/* <Header selection="courses" /> */}
        <div className='bg-gray-200 h-full min-h-screen'>
          <form
            action='http://localhost:4000/users/signin'
            id='myForm'
            method='post'
            onSubmit={addCourse}
          >
            <p className='flex font-bold justify-center text-2xl pb-16 text-blue-400'>
              Add Course Details
            </p>
            <div className='flex-col'>
              <div className='flex justify-center mb-10'>
                <div className='font-bold text-2xl'>
                  Title : &nbsp;&nbsp;&nbsp;
                </div>
                <input
                  type='text'
                  value={title}
                  placeholder='Enter Title'
                  className='w-1/2 border-black border-2'
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-center items-center mb-20'>
                <div className='font-bold text-2xl'>
                  Description : &nbsp;&nbsp;&nbsp;
                </div>
                <textarea
                  className='border-black border-2'
                  name=''
                  id=''
                  cols={100}
                  rows={4}
                  value={description}
                  placeholder='Enter Description'
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-center items-center mb-20'>
                <div className='font-bold text-2xl'>
                  Outcomes : &nbsp;&nbsp;&nbsp;
                </div>
                <div className='flex-col'>
                  <input
                    type='text'
                    value={courseOutcome1}
                    placeholder='Course Outcome 1'
                    className='w-full border-black border-2'
                    onChange={e => setCourseOutcome1(e.target.value)}
                    required
                  />
                  <input
                    type='text'
                    value={courseOutcome2}
                    placeholder='Course Outcome 2'
                    className='w-full border-black border-2'
                    onChange={e => setCourseOutcome2(e.target.value)}
                    required
                  />
                  <input
                    type='text'
                    value={courseOutcome3}
                    placeholder='Course Outcome 3'
                    className='w-full border-black border-2'
                    onChange={e => setCourseOutcome3(e.target.value)}
                    required
                  />
                  <input
                    type='text'
                    value={courseOutcome4}
                    placeholder='Course Outcome 4'
                    className='w-full border-black border-2'
                    onChange={e => setCourseOutcome4(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='flex justify-around'>
                <div
                  id='password__err2'
                  className='text-red-600 hidden justify-center'
                >
                  <p>{error}</p>
                </div>
                <button
                  type='submit'
                  className='btn-info rounded-lg font-semibold p-5'
                >
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseForm
