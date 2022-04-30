import { useState, useEffect } from 'react'
import Login from './Components/Login'
import LoginTutor from './Components/LoginTutor'
import Signup from './Components/Signup'
import './App.css'
import Courses from './Components/Courses'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewCourseContainer from './courseCreation/NewCourseContainer'
import NewCourseWizard from './courseCreation/NewCourseWizard'

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<NewCourseContainer />}></Route>
          <Route path='/studentlogin' element={<Login />}></Route>
          <Route path='/tutorlogin' element={<LoginTutor />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/courses/new' element={<NewCourseContainer />}></Route>
          <Route path='/course/new/:id' element={<NewCourseWizard />}></Route>
          <Route path='/course' element={<Courses />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
