import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { UserStateType, UserType } from "../actions/types/UserAction.types";
import { setUser } from "../actions/types/users/Users.actions";
import { auth } from "../firebase";
import { Store } from "../store";

const PrivateRoute = ({
  user,
  children,
}: {
  user: UserType;
  children: JSX.Element;
}) => {
  let location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log("User logged in: ", users.user);
  //   // auth.onAuthStateChanged((authUser) => {
  //   //   console.log("The user is :", authUser);
  //   //   if (authUser) {
  //   //     dispatch(setUser("SET_USER", authUser));
  //   //   } else {
  //   //     dispatch(setUser("SET_USER", null));
  //   //   }
  //   // });
  // }, []);
  console.log("User logged in: ", user.user);

  setTimeout(() => {
    if (user?.user === null) {
      console.log("Entered!!!!!");
      return <Navigate to="/login" state={{ from: location }} />;
    } else {
      return children;
    }
  }, 1000);
};

export default PrivateRoute;
