import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { setUser } from "../actions/types/users/Users.actions";
import { auth } from "../firebase";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const userDetail = useSelector((state: RootStateOrAny) => state.users);

  useEffect(() => {
    console.log("User logged in: ", userDetail.user);
    // auth.onAuthStateChanged((authUser) => {
    //   console.log("The user is :", authUser);
    //   if (authUser) {
    //     dispatch(setUser("SET_USER", authUser));
    //   } else {
    //     dispatch(setUser("SET_USER", null));
    //   }
    // });
  }, []);

  if (userDetail.user === null) {
    console.log("Entered!!!!!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
