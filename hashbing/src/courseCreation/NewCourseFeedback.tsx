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

type Props = {}

function NewCourseFeedback ({}: Props) {
  //   const addInputField = () => <input value='first' />
  const [inputList, setInputList] = useState<InputFieldType>({})
  const [outcomeError, setOutcomeError] = useState(false)

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

  // handle click event of the Add button
  const handleAddClick = () => setInputList({ ...inputList, [uuidv4()]: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courses } = useSelector((state: Store) => state)

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
        true
      )
    )
    courses.error.length <= 0
      ? navigate('/courses/courseCreateConfirmation')
      : navigate('/courses/new')
  }

  return (
    <div className='flex flex-col items-center h-screen my-5'>
      <div className=''>One Last Step</div>
      <div className='flex flex-col justify-space-between items-center w-screen mt-5 h-full'>
        {outcomeError && (
          <div className='text-red-500 border-2 border-red-500 m-5'>
            Please add at least a single outcome for this course
          </div>
        )}
        <div>Please Enter a few course outcomes of this project</div>
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
        <button
          className='bg-blue-500 rounded text-white'
          onClick={() => {
            return handleAddClick()
          }}
        >
          Add Course OutCome
        </button>
      </div>
    </div>
  )
}

export default NewCourseFeedback
