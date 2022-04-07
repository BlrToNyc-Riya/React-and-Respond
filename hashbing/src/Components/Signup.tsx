import {
  faEnvelope,
  faLock,
  faLockOpen,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { auth } from "../firebase";
import logo1 from "../Images/google-logo.png";
import firebase from "firebase";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("student");
  const provider = new firebase.auth.GoogleAuthProvider();

  const register = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        auth.user?.updateProfile({ displayName: name });
        console.log(name);
        if (auth) {
          if (role === "student") navigate("/studentlogin");
          if (role === "tutor") navigate("/tutorlogin");
          if (role === "both") navigate("/studentlogin");
        }
      })
      .catch((error) => alert(error.message));
  };

  const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="flex flex-col bg-green-300 min-h-screen">
      <div className="flex justify-between bg-white h-5/6 mt-20 mb-20 ml-72 mr-72 opacity-80 shadow-2xl shadow-slate-900 rounded-3xl">
        {/* <div className="w-1/2 flex justify-center items-center">
          <img src={logo} alt="" className="flex " />
        </div> */}
        <div className="flex w-full justify-center items-center">
          <div className="flex-col w-4/6">
            <p className="flex font-bold justify-center text-2xl pb-10 pt-5 text-green-500">
              Sign Up
            </p>
            <div className="flex-col justify-center ml-20 mr-20 mb-6">
              <div className="flex justify-center rounded-md border-2 mb-8">
                <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    size={"1x"}
                    color={"grey"}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-green-200 placeholder-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-center rounded-md border-2 mb-8">
                <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={"1x"}
                    color={"grey"}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Email ID"
                  className="w-full bg-green-200 placeholder-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-center rounded-md border-2 mb-8">
                <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                  <FontAwesomeIcon icon={faLock} size={"1x"} color={"grey"} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-green-200 placeholder-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center rounded-md border-2 mb-8">
                <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    size={"1x"}
                    color={"grey"}
                  />
                </div>
                <input
                  type="password"
                  placeholder="Re-Enter Password"
                  className="w-full bg-green-200 placeholder-black"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </div>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  <span className="text-green-500">Role</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="student"
                  name="radio-buttons-group"
                  row={true}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio color="success" />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="tutor"
                    control={<Radio color="success" />}
                    label="Tutor"
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio color="success" />}
                    label="Both"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="w-2/5 rounded-full h-10 text-lg shadow-slate-400 font-bold shadow-2xl bg-green-500 cursor-pointer"
                onClick={register}
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-center pb-5">
              <div className="flex-col">
                <p className="flex justify-center text-sm font-semibold">OR</p>
                <div className="flex justify-center text-sm text-green-500 font-semibold">
                  Continue with{" "}
                </div>
                <span
                  className="flex justify-center border-2 border-gray-500 cursor-pointer"
                  onClick={signInWithGoogle}
                >
                  <span className="text-sm ml-1 font-semibold text-gray-500 cursor-pointer">
                    <img src={logo1} alt="" className="h-10" />
                  </span>
                  <span className="text-sm font-semibold text-black flex items-center">
                    Google
                  </span>{" "}
                </span>
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-green-500">
                    Already have an account?
                  </p>{" "}
                  <Link to="/studentlogin">
                    <span className="text-sm ml-1 font-semibold text-blue-500 cursor-pointer">
                      Login as Student
                    </span>
                  </Link>
                  <span className="text-sm ml-1 font-semibold text-gray-500 ">
                    /
                  </span>
                  <Link to="/tutorlogin">
                    <span className="text-sm ml-1 font-semibold text-yellow-500 cursor-pointer">
                      Login as Tutor
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex h-full w-1/2 rounded-r-3xl bg-indigo-600"></div> */}
      </div>
    </div>
  );
}

export default Signup;
