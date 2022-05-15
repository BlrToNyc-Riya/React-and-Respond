import React, { useState } from 'react'
import Icons from '../utilComponents/Icons'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../store'
import { createCourseAddActionAction } from '../actions/types/courses/Courses.actions'
import {
  courseCreationStatus,
  InputFieldType
} from '../actions/types/CourseAction.types'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

import { createToken } from '../firebase'
import axios from 'axios'
import Button from '../Components/Button'

type Props = {}

function NewCourseFeedback ({}: Props) {
  //   const addInputField = () => <input value='first' />
  const [inputList, setInputList] = useState<InputFieldType>({})
  const [responseFile, setResponseFile] = useState('')
  const [outcomeError, setOutcomeError] = useState(false)
  const [imageUploadError, setImageUploadError] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: string
  ) => {
    const value = e.target.value
    const list = { ...inputList, [index]: value }
    setInputList(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index: string) => {
    const list = { ...inputList }
    delete list[index]
    setInputList(list)
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const header = await createToken()
    var formData = new FormData()
    if (selectedFile === null || selectedFile === undefined)
      alert('No file selected')
    // throw error if not image type
    if (selectedFile?.type.split('/')[0] !== 'image')
      return alert('Please upload an image jpg/jpeg/png')
    if (selectedFile != undefined) {
      formData.append('file', selectedFile)
    }
    const url = 'http://localhost:4000/courses/bannerUpload'
    // const config = {
    //   headers: { "content-Type": "multipart/form-data" },
    // };
    axios
      .post(url, formData, header)
      .then(response => {
        setResponseFile(response.data.filename)
      })
      .catch(error => {
        console.log(error)
        setImageUploadError(error.message)
      })
  }

  // handle click event of the Add button
  const handleAddClick = () => setInputList({ ...inputList, [uuidv4()]: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<File>()
  const { courses } = useSelector((state: Store) => state)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e || !e.target || !e.target.files) {
      alert('Please select an image')
      return
    }
    setSelectedFile(e?.target?.files[0])
  }

  const addCourseOutCome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (_.isEmpty(inputList)) {
      return setOutcomeError(true)
    }
    const { data } = courses
    setOutcomeError(false)
    dispatch(
      createCourseAddActionAction(
        {
          name: data.name,
          authorId: data.authorId,
          details: data.details,
          tags: data.tags,
          courseContent: data.courseContent,
          courseOutcome: inputList
        },
        courseCreationStatus.COURSE_CREATION_STAGE_3,
        true,
        responseFile
      )
    )
    courses.error.length <= 0
      ? navigate('/courses/courseCreateConfirmation')
      : navigate('/courses/new')
  }

  console.log('response', responseFile)

  const renderImageUploadError = () =>
    imageUploadError ? <div>{imageUploadError}</div> : null

  console.log('file', selectedFile?.name)

  return (
    <div className='flex flex-col items-center h-screen my-5'>
      {responseFile === '' && (
        <>
          <div className='border-b-2 border-blue-700'>One Last Step</div>
          {renderImageUploadError()}
          <form
            encType='multipart/form-data'
            onSubmit={handleUpload}
            className='flex flex-col items-center justify-center border-b-2 border-blue-700 w-full mb-5 h-1/3'
          >
            <label htmlFor='file' className='form-label my-2'>
              Upload a course banner
            </label>
            <input type='file' onChange={e => handleFileInput(e)} />
            <div className='my-5'>
              <Button
                name='Upload Course Banner'
                type='submit'
                disabled={responseFile !== ''}
              />
              {responseFile === '' ? null : (
                <div className='text-green-700'>
                  Image uploaded successfully
                </div>
              )}
            </div>
          </form>
        </>
      )}
      {responseFile !== '' && (
        <div className='flex flex-col justify-space-between items-center w-screen mt-5 h-full'>
          {outcomeError && (
            <div className='text-red-500 border-2 border-red-500 m-5'>
              Please add at least a single outcome for this course and also a
              course image
            </div>
          )}
          {responseFile === '' && (
            <div className='text-red-500 border-2 border-red-500 m-5'>
              Please upload an image for the course
            </div>
          )}
          <div>
            Almost there !!! Please Enter a few course outcomes of this project
          </div>
          <button
            className='bg-blue-500 rounded text-white p-2'
            onClick={() => {
              return handleAddClick()
            }}
          >
            Add Course OutCome
          </button>

          <form
            onSubmit={e => addCourseOutCome(e)}
            className='w-full flex flex-col items-center justify-center'
          >
            {Object.keys(inputList).map(id => {
              const newVal = inputList[id] as string
              return (
                <div
                  className='flex my-5 items-center justify-center w-full'
                  key={id}
                >
                  <label htmlFor='courseName'>Outcome</label>
                  <input
                    id='courseName'
                    className='ml-2 border-b-2 px-2 w-1/3'
                    type='text'
                    required
                    value={inputList[id]}
                    onChange={e => handleInputChange(e, id)}
                  />
                  <Icons
                    src='remove'
                    onClick={() => {
                      handleRemoveClick(id)
                    }}
                  />
                </div>
              )
            })}
            <button
              className='bg-blue-500 rounded text-white p-2 m-2'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default NewCourseFeedback
