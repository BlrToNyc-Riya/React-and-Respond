import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios, { AxiosResponse } from 'axios'

function App () {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<string | AxiosResponse<string, any>>('')

  useEffect(() => {
    axios
      .post('http://localhost:4000/users/signup', {
        username: 'testuser1',
        password: 'testuser',
        email: 'testuser1@test.com'
      })
      .then(res => {
        setData(res.data)
      })
  }, [])

  return <div className='App'>{JSON.stringify(data)}</div>
}

export default App
