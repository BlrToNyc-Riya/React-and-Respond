import { useState, useEffect } from 'react'
// import "./App.css";
import axios, { AxiosResponse } from 'axios'
import Login from './Components/Login'
import LoginTutor from './Components/LoginTutor'
import Signup from './Components/Signup'
import './App.css'
import Courses from './Components/Courses'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App () {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<string | AxiosResponse<string, any>>('')

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/studentlogin' element={<Login />}></Route>
          <Route path='/tutorlogin' element={<LoginTutor />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/courses' element={<Courses />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
