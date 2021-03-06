import React, { useState, useEffect, ReactChild } from 'react'
// import "./App.css";
import axios, { AxiosResponse } from 'axios'
import Login from './Components/Login'
import Signup from './Components/Signup'
import './App.css'
import Courses from './Components/Courses'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import CourseDetails from './Components/CourseDetails'
import Enrolled from './Components/Enrolled'
import Header from './Components/Header'
import Users from './Components/Users'
import Authored from './Components/Authored'
import NewCourseContainer from './courseCreation/NewCourseContainer'
import NewCourseWizard from './courseCreation/NewCourseWizard'
import CourseForm from './Components/CourseForm'
import {
  DefaultRootState,
  RootStateOrAny,
  useDispatch,
  useSelector
} from 'react-redux'
import { auth } from './firebase'
import { setUser } from './actions/types/users/Users.actions'
import { Store } from './store'
import { UserType } from './actions/types/UserAction.types'
import PrivateRoute from './Components/PrivateRoute'
import UnknownPage from './Components/UnknownPage'
import CourseCreationConfirmation from './courseCreation/CourseCreationConfirmation'
import NewCourse from './courseCreation/NewCourse'

function App () {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  const { users } = useSelector((state: Store) => state)

  return (
    <BrowserRouter>
      <div className='App h-screen'>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          {/* <Route path='/tutorlogin' element={<LoginTutor />}></Route> */}
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<PrivateRoute user={users} />}>
            <Route path='/courses/:id' element={<CourseDetails />} />
            <Route path='/' element={<Courses />} />
            <Route path='/enrolled' element={<Enrolled />} />
            <Route path='/authored' element={<Authored />} />
            <Route path='/users' element={<Users />} />
            <Route path='/courses/new' element={<NewCourseContainer />}></Route>
            <Route path='/course/:id' element={<NewCourse />}></Route>
            <Route path='/course/new/:id' element={<NewCourseWizard />}></Route>
            <Route path='/courses/new/:id/add' element={<CourseForm />}></Route>
            <Route
              path='/courses/courseCreateConfirmation'
              element={<CourseCreationConfirmation />}
            ></Route>
          </Route>
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
