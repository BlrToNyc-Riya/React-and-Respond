import { faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../Images/flame.gif";
import logo1 from "../Images/google-logo.png";
import React, { EventHandler, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../firebase";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const provider = new firebase.auth.GoogleAuthProvider();

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email_err = document.getElementById("email__err");
    let password_err = document.getElementById("password__err");
    let password_err2 = document.getElementById("password__err2");
    let form = document.forms[0];
    console.log(email);
    let validEmail = true;
    let validPassword = true;
    if (email !== undefined && email_err !== null) {
      if (email === "") {
        email_err.innerText = "Email cannot be null!";
        email_err.style.display = "flex";
        validEmail = false;
      } else if (!validateEmail(email)) {
        email_err.innerText = "Email is of incorrect format!";
        email_err.style.display = "flex";
        validEmail = false;
      } else {
        email_err.style.display = "none";
        validEmail = true;
      }
    }

    if (password !== undefined && password_err !== null) {
      if (password.length < 8) {
        password_err.style.display = "flex";
        validPassword = false;
      } else {
        password_err.style.display = "none";
        validPassword = true;
      }
    }
    if (password_err2 !== null) {
      password_err2.style.display = "none";
    }
    if (validEmail && validPassword) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          const url = "http://localhost:4000/users/signin";
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          };
          fetch(url, requestOptions)
            .then((response) => {
              if (response.ok == true) navigate("/");
              else {
                if (password_err2 !== null) {
                  password_err2.style.display = "flex";
                  response.text().then((text) => {
                    setError(text);
                  });
                }
              }
            })
            .catch((error) => {
              setError(error.message);
              if (password_err2 !== null) {
                password_err2.style.display = "flex";
              }
            });
        })
        .catch((error) => {
          if (password_err2 !== null) {
            password_err2.style.display = "flex";
          }
          setError("Email / Password is incorrect!");
        });
      // var delayInMilliseconds = 2000;
      // setTimeout(function () {}, delayInMilliseconds);

      console.log("Entered");

      console.log("Entered first");
    }
  };

  const resetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let password_err2 = document.getElementById("password__err2");
    if (password_err2 !== null) {
      password_err2.style.display = "none";
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password Reset Link has been sent to the corresponding Email!");
      })
      .catch((error) => {
        if (password_err2 !== null) {
          password_err2.style.display = "flex";
        }
        setError(error.message);
      });
  };

  const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    let password_err2 = document.getElementById("password__err2");
    if (password_err2 !== null) {
      password_err2.style.display = "none";
    }
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        if (password_err2 !== null) {
          password_err2.style.display = "flex";
        }
        setError(error.message);
      });
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const url = "http://localhost:4000/users/signin";
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   };
  //   fetch(url, requestOptions)
  //     .then((response) => console.log("Submitted successfully"))
  //     .catch((error) => console.log("Form submit error", error));
  // };

  return (
    <div className="flex flex-col bg-sky-300 min-h-screen">
      <div className="flex justify-between bg-white h-5/6 mt-20 mb-20 ml-72 mr-72 opacity-80 shadow-2xl shadow-slate-900 rounded-3xl">
        <div className="w-1/2 lg:flex  hidden justify-center items-center">
          <img src={logo} alt="" className="flex" />
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="flex-col w-full">
            <p className="flex font-bold justify-center text-2xl pb-16 text-blue-400">
              Sign In
            </p>
            <form
              action="http://localhost:4000/users/signin"
              id="myForm"
              method="post"
              onSubmit={signIn}
            >
              <div className="flex-col justify-center ml-20 mr-20 mb-10">
                <div id="email__err" className="text-red-600 hidden"></div>
                <div className="flex justify-center rounded-md border-2 mb-10">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-blue-200">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <input
                    type="text"
                    value={email}
                    placeholder="Email ID"
                    className="w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="password__err" className="text-red-600 hidden">
                  Password must be atleast 6 characters!
                </div>
                <div className="flex justify-center rounded-md border-2">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-blue-200">
                    <FontAwesomeIcon icon={faLock} size={"1x"} color={"grey"} />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div
                id="password__err2"
                className="text-red-600 hidden justify-center"
              >
                <p>{error}</p>
              </div>
              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="bg-blue-200 w-2/5 rounded-full h-10 text-lg text-gray-500 shadow-slate-400 font-bold shadow-2xl cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <div className="flex-col">
                <p className="flex justify-center text-sm font-semibold">OR</p>
                <div className="flex justify-center text-sm text-blue-400 font-semibold">
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
                  <p className="text-sm font-semibold text-blue-400">
                    Don't have an account yet?
                  </p>{" "}
                  <Link to="/signup">
                    <span className="text-sm ml-1 font-semibold text-gray-500 cursor-pointer ">
                      Create a new account
                    </span>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-blue-400">
                    Forgot Password?
                  </p>{" "}
                  <span
                    className="text-sm ml-1 font-semibold text-gray-500 cursor-pointer"
                    onClick={resetPassword}
                  >
                    Send Reset Password Link to Email
                  </span>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-blue-400">
                    Want to teach?
                  </p>{" "}
                  <Link to="/tutorlogin">
                    <span className="text-sm ml-1 font-semibold text-gray-500 cursor-pointer">
                      Tutor Login
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
};

export default Login;
