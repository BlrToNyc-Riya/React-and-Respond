import { ClipboardCheckIcon, CheckCircleIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../Components/Button";
import.meta.env.VITE_SOME_VALUE;
import {
  courseCreationErrors,
  isValidString
} from "../Components/Utilities/Validations";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../store";
import {
  createCourseAction,
  createCourseActionResetError
} from "../actions/types/courses/Courses.actions";
import _ from "lodash";
import { courseCreationStatus } from "../actions/types/CourseAction.types";

type Props = {};

type errorStateType = "title" | "description" | "tags";

function NewCourseInit ({}: Props) {
  const dispatch = useDispatch();
  const { users } = useSelector((state: Store) => state);

  //states
  const [courseName, setCourseName] = React.useState<string | null>(null);
  const [courseDetails, setcourseDetails] = React.useState<string | null>(null);
  const [courseTags, setCourseTags] = React.useState<string | null>(null);
  const [errorStateList, setErrorStateList] = useState({
    title: "",
    description: "",
    tags: ""
  });
  const createCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors = {
      title: "",
      description: "",
      tags: ""
    };
    if (!courseName || courseName.trim().length < 3) {
      errors.title = courseCreationErrors.TITLE;
    } else {
      errors.title = "";
    }
    if (!courseDetails || courseDetails.trim().length < 10) {
      errors.description = courseCreationErrors.DESCRIPTION;
    } else {
      errors.description = "";
    }
    if (!courseTags || courseTags.trim().length < 3) {
      errors.tags = courseCreationErrors.TAGS;
    } else {
      errors.tags = "";
    }
    if (
      errors.title === "" &&
      errors.tags === "" &&
      errors.description === ""
    ) {
      dispatch(
        createCourseAction(
          {
            name: courseName as string,
            authorId: users?.user?.uid,
            details: courseDetails as string,
            tags: courseTags as string,
            courseContent: "",
            courseOutcome: {}
          },
          courseCreationStatus.COURSE_CREATION_STAGE_2
        )
      );
    }
    return setErrorStateList(errors);
  };

  console.log("env", import.meta.env.VITE_SOME_VALUE);

  const renderCheckIcon = (val: string | null): React.ReactNode => {
    if (val === null) return null;
    if (!isRequired(val)) {
      return <CheckCircleIcon className='h-5 w-5 text-green-500' />;
    }
    return <div></div>;
  };
  const isRequired = (val: string | null, length: number = 3): boolean => {
    if (val === null) return false;
    return isValidString(val, length) ? false : true;
  };

  return (
    <div>
      <div className='h-screen flex flex-col w-full '>
        <div className='h-3/4 flex flex-col w-full items-center justify-center'>
          <div className=' m-1 p-2 flex border shadow-md rounded items-center justify-center w-3/4 offset-1'>
            <ClipboardCheckIcon className='h-5 w-5 text-blue-500' />
            Please enter a few details
          </div>
          <form
            className='flex flex-col shadow border items-center justify-evenly w-3/4 h-full md:h-1/2 p-2'
            onSubmit={e => createCourse(e)}
          >
            <div className='flex w-full justify-center h-1/1'>
              <div className='flex flex-col w-full p-2 '>
                <div className='formElements items-evenly justify-evenly items-start'>
                  <label className='text-gray-700' htmlFor='courseName'>
                    Course Name
                  </label>
                  <div className='w-3/4 flex flex-col'>
                    <input
                      id='courseName'
                      className='w-3/4 ml-2 border-b-2 px-2'
                      type='text'
                      placeholder='Course Name'
                      // ref={courseNameRef}
                      onChange={e => setCourseName(e.target.value)}
                    />
                    <p
                      className={`block mt-2 text-sm text-red-600 dark:text-red-500 ${
                        isRequired(courseName) ? "" : "hidden"
                      }`}
                    >
                      <span className='font-medium'>OOPS!</span>{" "}
                      {courseCreationErrors.TITLE}
                    </p>
                  </div>
                  {renderCheckIcon(courseName)}
                </div>
                <div></div>

                <div className='formElements justify-evenly items-start'>
                  <label className='text-gray-700' htmlFor='courseDescription'>
                    Course Details
                  </label>
                  <div className='w-3/4 flex flex-col'>
                    <textarea
                      id='courseDescription'
                      className='max-w-3/4 ml-2 border-b-2 px-2'
                      placeholder='Course Details'
                      // ref={courseDescriptionRef}
                      onChange={e => setcourseDetails(e.target.value)}
                    />
                    <p
                      className={`block mt-2 text-sm text-red-600 dark:text-red-500 ${
                        isRequired(courseDetails, 10) ? "" : "hidden"
                      }`}
                    >
                      <span className='font-medium'>OOPS!</span>{" "}
                      {courseCreationErrors.DESCRIPTION}
                    </p>
                  </div>
                  {renderCheckIcon(courseDetails)}
                </div>
                <div className='formElements justify-evenly items-start'>
                  <label className='text-gray-700' htmlFor='courseTag'>
                    Course Tags
                  </label>
                  <div className='w-3/4 flex flex-col items-evenly'>
                    <input
                      id='courseTag'
                      className='w-3/4 ml-2 border-b-2 px-2'
                      type='text'
                      placeholder='Course Tag'
                      // ref={courseTag}
                      onChange={e => setCourseTags(e.target.value)}
                    />

                    <p
                      className={`block mt-2 text-sm text-red-600 dark:text-red-500 ${
                        isRequired(courseTags) ? "" : "hidden"
                      }`}
                    >
                      <span className='font-medium'>OOPS!</span>{" "}
                      {courseCreationErrors.TAGS}
                    </p>
                  </div>
                  {renderCheckIcon(courseTags)}
                </div>
              </div>
            </div>
            <div className='group'>
              <Button name='Create a Course' type='submit' className='sm:m-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 group-hover:animate-bounce ml-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z' />
                </svg>
              </Button>
            </div>
          </form>
          {!_.isEmpty(errorStateList) && (
            <ul className='flex flex-col border p-2 my-2'>
              {Object.keys(errorStateList).map(
                (value: errorStateType, index: number) => (
                  <li key={index} className='text-red-500'>
                    {errorStateList[value]}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewCourseInit;
