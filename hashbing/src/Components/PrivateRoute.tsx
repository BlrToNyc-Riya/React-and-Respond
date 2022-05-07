import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom'
import { UserStateType, UserType } from '../actions/types/UserAction.types'
import { setUser } from '../actions/types/users/Users.actions'
import { auth } from '../firebase'
import { Store } from '../store'

const PrivateRoute = ({
  user,
  children
}: {
  user: any
  children?: JSX.Element
}) => {
  let location = useLocation()
  const dispatch = useDispatch()

  if (user?.user === null) {
    console.log('Entered!!!!!')
    return <Navigate to='/login' replace />
  } else {
    return children ? children : <Outlet />
  }
}

export default PrivateRoute
