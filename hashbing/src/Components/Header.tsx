import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
interface items {
  section: string
}
function Header () {
  // if (props.section === "courses") {
  //   const courses = document.getElementById("courses");
  // } else if (props.details === "enrolled") {
  //   const enrolled = document.getElementById("enrolled");
  // } else if (props.details === "user") {
  //   const user = document.getElementById("user");
  // }

  return (
    <div className='flex w-full shadow-2xl'>
      <div className='flex w-1/2 justify-start'>
        <div className='flex m-4'>
          <div className='dropdown dropdown-hover'>
            <label tabIndex={0} className='m-1'>
              <FontAwesomeIcon
                icon={faUserCircle}
                size={'2x'}
                color={'grey'}
                className='cursor-pointer relative'
              />
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 '
            >
              <li>
                <a className='hover:bg-sky-400' href='/'>
                  Courses
                </a>
              </li>
              <li>
                <a className='hover:bg-sky-400' href='/users'>
                  John Wick
                </a>
              </li>
              <li>
                <a className='hover:bg-sky-400'>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex w-1/2 justify-end'>
        <Link to='/'>
          <div
            id='courses'
            className='text-md font-bold p-5 text-blue-400 cursor-pointer'
          >
            Courses
          </div>
        </Link>
        <Link to='/enrolled'>
          <div id='enrolled' className='text-md font-bold p-5 cursor-pointer'>
            Enrolled
          </div>
        </Link>
        <Link to='/authored'>
          <div id='authored' className='text-md font-bold p-5 cursor-pointer'>
            Authored
          </div>
        </Link>
        <div className='text-md font-bold p-5 cursor-pointer'>Logout</div>
      </div>
    </div>
  )
}

export default Header
