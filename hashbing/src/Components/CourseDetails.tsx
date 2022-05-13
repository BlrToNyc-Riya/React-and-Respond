import React, { useEffect, useState } from 'react'
import Header from './Header'
import logo from '../Images/course1.png'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import { createToken } from '../firebase'

type courseDetailType = {
  title: string
  description: string
  courseOutcome: { [key: string]: string }
}

function CourseDetails () {
  const [course, setCourse] = useState<courseDetailType>()
  const params = useParams()
  const [rerender, setRerender] = useState(false)
  const [enrolled, setEnrolled] = useState<String[]>([])
  const cid = params.id

  useEffect(() => {
    const fetchData = async () => {
      const header = await createToken()
      const url = `http://localhost:4000/courses/${cid}/`
      fetch(url, {
        method: 'GET',
        headers: header.headers
      })
        .then(async response => {
          const cou = await response.json()
          console.log(cou)
          setCourse(cou)
        })
        .catch(error => console.log(error.message))
    }
    fetchData()
  }, [rerender])

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:4000/courses/Enrolled/`
      // const requestOptions = {
      //   method: "GET",
      // };
      const header = await createToken()
      fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: header.headers
      })
        .then(async response => {
          const cou = await response.json()
          console.log(cou)
          setEnrolled(cou.Enrolled)
        })
        .catch(error => console.log(error.message))
    }
    fetchData()
  }, [rerender])
  const enrollCourse = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    const url = `http://localhost:4000/courses/${id}/enroll`
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => {
        console.log('Status Changed Successfully')
        setRerender(!rerender)
      })
      .catch(error => console.log(error.message))
  }

  const unregisterCourse = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const url = `http://localhost:4000/courses/${id}/unregister`
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => {
        console.log('Status Changed Successfully')
        setRerender(!rerender)
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div className='flex bg-white w-screen rounded-2xl'>
      <div className='flex flex-col w-full h-full rounded-2xl'>
        {/* <Header selection='courses' /> */}
        <div className='flex bg-gray-200 h-full rounded-b-2xl'>
          <div className='flex flex-col basis-3/4 h-full'>
            <div className='flex-col w-full h-full'>
              <div className='flex m-10  align-middle items-center rounded-2xl h-full bg-sky-400 shadow-2xl'>
                <div className='flex-col'>
                  <br />
                  <p className='text-4xl text-white font-sans font-bold text-left pl-10'>
                    {course?.title}
                  </p>
                  <br />
                  <p className='text-md text-white font-sans font-bold text-left pl-10'>
                    {course?.description}
                  </p>
                  <br />
                  <p className='text-sm text-white font-sans font-bold pl-10'>
                    Created by
                    <span className='text-xs font-sans font-semibold pl-2 text-black'>
                      Govind Radhakrishnan
                    </span>
                  </p>
                  <br />
                  <p className='text-sm text-white font-sans font-bold pl-10'>
                    Last Updated on
                    <span className='text-xs font-sans font-semibold pl-2 text-black'>
                      15/05/2021
                    </span>
                  </p>
                  {/* Score */}
                  {/* <div className='flex-col m-6'>
                    <p className='text-xs font-sans font-semibold pl-2'>
                      Chapter Progress : 0/30 completed(25%)
                    </p>
                    <div className='bg-gray-300 h-2 rounded-3xl m-2'>
                      <div className='bg-blue-600 w-1/4 h-2 rounded-3xl'></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className='flex-col w-full mb-20 mt-10 h-full'>
              <div className='flex rounded-xl align-middle items-center m-10 h-full bg-white shadow-2xl'>
                <div className='flex-col p-10'>
                  <p className='text-3xl font-sans font-bold text-left pl-10 pb-10'>
                    What You will Learn
                  </p>
                  <br />
                  <div className='flex flex-wrap'>
                    {course &&
                      Object.keys(course.courseOutcome)?.map(id => (
                        <h1 className='text-xs font-sans text-left pl-10 w-1/2'>
                          <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />{' '}
                          {course?.courseOutcome[id]}
                        </h1>
                      ))}
                    <br />
                  </div>
                </div>
              </div>
            </div>
            {/* <p className='text-4xl font-sans font-bold text-left pl-10'>
              Course Content
            </p>
            <div className='flex-col w-full mb-20 h-full'>
              <div className='flex align-middle items-center m-10 h-full bg-white shadow-2xl'>
                <div className='flex-col'>
                  <p className='text-2xl font-sans font-bold text-left pl-10'>
                    What You will Learn
                  </p>
                  <br />
                  <div className='flex flex-wrap'>
                    <p className='text-xs font-sans text-left pl-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />{' '}
                      {course?.courseOutcome1}
                    </p>
                    <br />

                    <p className='text-xs font-sans text-left pl-10 w-1/2'>
                      {' '}
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />
                      {course?.courseOutcome2}
                    </p>
                    <br />
                    <p className='text-xs font-sans text-left pl-10 pt-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />{' '}
                      {course?.courseOutcome3}
                    </p>

                    <p className='text-xs font-sans pl-10 pt-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />
                      {course?.courseOutcome4}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className='flex flex-col basis-1/5 rounded-br-2xl h-full relative'>
            <div className='flex-col h-10'></div>
            <div className='flex cursor-pointer h-96 fixed'>
              <div className='flex-col h-full mr-20 mt-10 bg-white shadow-2xl'>
                {/* Img */}
                <div className='flex justify-center'>
                  <img src={logo} alt='' className='h-40 w-full object-fill' />
                </div>
                {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                {/* Topic */}
                <div className='flex-col'>
                  <div className='flex-col'>
                    <p className='text-lg font-sans font-bold text-center pl-2'>
                      Modern React Course for Beginners-Foundation Course
                    </p>
                  </div>
                  {/* Details Section */}
                  <div className='flex-col mt-4 bg-white'>
                    <div className='flex justify-center'>
                      {cid != undefined && enrolled?.includes(cid) ? (
                        <button
                          className='bg-sky-400 p-3 w-4/5 mb-4 text-white'
                          onClick={e => unregisterCourse(e, cid)}
                        >
                          Unregister
                        </button>
                      ) : (
                        cid != undefined && (
                          <button
                            className='bg-sky-400 p-3 w-4/5 mb-4 text-white'
                            onClick={e => enrollCourse(e, cid)}
                          >
                            Enroll
                          </button>
                        )
                      )}
                    </div>
                    <div className='flex justify-center'>
                      <button className='text-sky-400 p-3'>
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-1/12 h-full'></div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
