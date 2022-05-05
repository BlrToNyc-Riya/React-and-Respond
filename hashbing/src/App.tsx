import React, { useState, useEffect, ReactChild } from "react";
// import "./App.css";
import axios, { AxiosResponse } from "axios";
import Login from "./Components/Login";
import LoginTutor from "./Components/LoginTutor";
import Signup from "./Components/Signup";
import "./App.css";
import Courses from "./Components/Courses";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CourseDetails from "./Components/CourseDetails";
import Enrolled from "./Components/Enrolled";
import Header from "./Components/Header";
import Users from "./Components/Users";
import Authored from "./Components/Authored";
import NewCourseContainer from "./courseCreation/NewCourseContainer";
import NewCourseWizard from "./courseCreation/NewCourseWizard";
import CourseForm from "./Components/CourseForm";
import {
  DefaultRootState,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./actions/types/users/Users.actions";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const userDetail = useSelector((state: RootStateOrAny) => state.users);

  useEffect(() => {
    console.log("User logged in: ", userDetail.user);
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is :", authUser);
      if (authUser) {
        dispatch(setUser("SET_USER", authUser));
      } else {
        dispatch(setUser("SET_USER", null));
      }
    });
  }, []);

  // const ProtectedRoute = ({ user, children }) => {
  //   if (!user) {
  //     return <Navigate to="/" replace />;
  //   }

  //   return children;
  // };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/tutorlogin" element={<LoginTutor />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Courses emailId={userDetail?.user?.email} />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/courses/:id"
            element={
              <PrivateRoute>
                <CourseDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/enrolled"
            element={
              <PrivateRoute>
                <Enrolled />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/authored"
            element={
              <PrivateRoute>
                <Authored />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/courses/new" element={<NewCourseContainer />}></Route>
          <Route path="/course/new/:id" element={<NewCourseWizard />}></Route>
          <Route
            path="/courses/new/:id/add"
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
