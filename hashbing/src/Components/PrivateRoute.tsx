import { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom'
import { UserStateType, UserType } from '../actions/types/UserAction.types'
import { setUser } from '../actions/types/users/Users.actions'
import { auth } from '../firebase'
import { Store } from '../store'
import Loader from './Utilities/Loader'

const PrivateRoute = ({
  user,
  children
}: {
  user: any
  children?: JSX.Element
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(setUser('SET_USER', authUser))
        setIsLoading(false)
      } else {
        dispatch(setUser('SET_USER', null))
        setIsLoading(false)
      }
    })
  }, [])

  const { users } = useSelector((state: Store) => state)

  if (isLoading) return <Loader />
  else if (user?.user === null) {
    return <Navigate to='/login' replace />
  } else {
    return children ? children : <Outlet />
  }
}

export default PrivateRoute
