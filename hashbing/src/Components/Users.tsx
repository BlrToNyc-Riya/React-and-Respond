import { FontawesomeObject } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faPencil,
  faPencilAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconProps } from "@mui/material";
import axios from "axios";
import React, {
  FormEventHandler,
  HTMLProps,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { createToken } from "../firebase";
import logo from "../Images/course1.png";
import logo1 from "../public/uploads/IMAGE-1651806371090.jpeg";
import Header from "./Header";
type courseDet = {
  _id: string;
  title: string;
  description: string;
  courseOutcome1: string;
  courseOutcome2: string;
  courseOutcome3: string;
  courseOutcome4: string;
};

function Users() {
  const [images, setImages] = useState<File>();
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const [courses, setCourses] = useState<courseDet[]>();
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const [authored, setAuthored] = useState<String[]>();
  const [enrolled, setEnrolled] = useState<String[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/`;
      // const requestOptions = {
      //   method: "GET",
      //   credentials: "include",
      // };
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include",
      })
        .then(async (response) => {
          const cou = await response.json();
          console.log(cou);
          setCourses(cou.courses);
        })
        .catch((error) => console.log(error.message));
    };
    fetchCourses();
    return () => {
      fetchCourses;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/Enrolled/`;
      // const requestOptions = {
      //   method: "GET",
      // };
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include",
      })
        .then(async (response) => {
          const cou = await response.json();
          console.log(cou);
          setEnrolled(cou.Enrolled);
        })
        .catch((error) => console.log(error.message));
    };
    fetchEnrolled();
    return () => {
      fetchEnrolled;
    };
  }, [rerender]);
  const enrollCourse = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    const header = await createToken();
    const url = `http://localhost:4000/courses/${id}/enroll`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: "PUT",
      headers: header.headers,
      credentials: "include",
    })
      .then((response) => {
        console.log("Status Changed Successfully");
        setRerender(!rerender);
      })
      .catch((error) => console.log(error.message));
  };

  const unregisterCourse = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const header = await createToken();
    const url = `http://localhost:4000/courses/${id}/unregister`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: "PUT",
      headers: header.headers,
      credentials: "include",
    })
      .then((response) => {
        console.log("Status Changed Successfully");
        setRerender(!rerender);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    const fetchToken = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/authored/`;
      // const requestOptions = {
      //   method: "GET",
      // };
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include",
      })
        .then(async (response) => {
          const cou = await response.json();
          console.log(cou);
          setAuthored(cou.Authored);
        })
        .catch((error) => console.log(error.message));
    };
    fetchToken();
    return () => {
      fetchToken;
    };
  }, [rerender]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    if (e.target.files != null) setImages(e.target.files[0]);
    console.log(images);
    setTimeout(() => {
      submitBtn.current?.click();
    }, 2000);
  };

  const uploadTrigger = () => {
    fileInput.current?.click();
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const header = await createToken();
    var formData = new FormData();
    if (images != undefined) {
      formData.append("myImage", images);
    }
    console.log(formData.get("myImage"));
    const url = "http://localhost:4000/users/upload";
    // const config = {
    //   headers: { "content-Type": "multipart/form-data" },
    // };
    axios
      .post(url, formData, header)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex bg-white w-screen rounded-2xl">
      <div className="flex flex-col w-full h-full rounded-2xl">
        {/* <Header selection="users" /> */}
        <div className="flex flex-col bg-gray-200 w-full h-full rounded-b-2xl shadow-2xl">
          <div className="flex w-full justify-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                <form id="myForm" onSubmit={onFormSubmit}>
                  {profilePic ? (
                    <img
                      className="relative mt-4 h-48 w-48 rounded-full object-fill"
                      src={logo1}
                      alt=""
                    />
                  ) : (
                    <div className="bg-white mt-4 p-14 rounded-full">
                      <FontAwesomeIcon
                        icon={faUser}
                        size={"5x"}
                        color={"grey"}
                        className="relative"
                      />
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="relative bottom-4 left-36"
                    color={"black"}
                    id="pencil_icon"
                    onClick={uploadTrigger}
                  />{" "}
                  <input
                    type="file"
                    id="myfile"
                    className="hidden"
                    name="profile-file"
                    onChange={onImageChange}
                    ref={fileInput}
                    required
                  />
                  <button type="submit" className="hidden" ref={submitBtn}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="flex flex-col justify-left ml-10">
            <p className="font-bold text-xl text-center underline mb-6">
              Profile :
            </p>
            <form action="">
              <p className="font-bold text-lg">
                Name:
                <span className="font-semibold ml-1 mr-1">John</span>
                <span className="font-semibold">Wick</span>
              </p>
              <p className="font-bold text-lg">
                Email:
                <span className="font-semibold ml-2">Johnwick@hotmail.com</span>
              </p>
            </form>
          </div>
          <br />
          <div className="flex flex-col justify-left ml-4 mb-10">
            <p className="font-bold text-xl text-center underline mb-2">
              Enrolled Courses :
            </p>
            <div className="grid w-full h-full md:grid-cols-4 gap-20 p-10 grid-cols-1">
              {courses?.map(
                (course) =>
                  enrolled.includes(course._id) && (
                    <div
                      className="flex cursor-pointer h-80 top-10"
                      key={course._id}
                    >
                      <div className="flex-col h-full bg-white shadow-2xl">
                        {/* Img */}
                        <div className="flex justify-center">
                          <img
                            src={logo}
                            alt=""
                            className="h-40 w-full object-fill"
                          />
                        </div>
                        {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                        {/* Topic */}
                        <div className="flex-col">
                          <div className="flex-col min-h-16">
                            <p className="text-lg font-sans font-bold text-center pl-2">
                              {course?.title}
                            </p>
                          </div>
                          {/* Score */}
                          <div className="flex-col mt-4">
                            <p className="text-xs font-sans font-semibold text-gray-500 pl-2">
                              Chapter Progress : 0/30 completed(25%)
                            </p>
                            <div className="bg-gray-300 h-2 rounded-3xl m-2">
                              <div className="bg-blue-400 w-1/4 h-2 rounded-3xl"></div>
                            </div>
                          </div>
                          {/* Details Section */}
                          <div className="flex-col mt-4 bg-white">
                            <div className="flex justify-center">
                              {enrolled?.includes(course._id) ? (
                                <button
                                  className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                  onClick={(e) =>
                                    unregisterCourse(e, course._id)
                                  }
                                >
                                  Unregister
                                </button>
                              ) : (
                                <button
                                  className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                  onClick={(e) => enrollCourse(e, course._id)}
                                >
                                  Enroll
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col justify-left ml-4 m">
            <p className="font-bold text-xl text-center underline mb-2">
              Courses Authored:
            </p>
            <div className="grid w-full h-full md:grid-cols-4 gap-20 p-10 grid-cols-1">
              {courses?.map(
                (course) =>
                  authored?.includes(course._id) && (
                    <div
                      className="flex cursor-pointer h-80 top-10"
                      key={course._id}
                    >
                      <div className="flex-col h-full bg-white shadow-2xl">
                        {/* Img */}
                        <div className="flex justify-center">
                          <img
                            src={logo}
                            alt=""
                            className="h-40 w-full object-fill"
                          />
                        </div>
                        {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                        {/* Topic */}
                        <div className="flex-col">
                          <div className="flex-col min-h-16">
                            <p className="text-lg font-sans font-bold text-center pl-2">
                              {course?.title}
                            </p>
                          </div>
                          {/* Score */}
                          <div className="flex-col mt-4 bg-white">
                            <p className="text-xs font-sans font-semibold text-gray-500 pl-2">
                              Chapter Progress : 0/30 completed(25%)
                            </p>
                            <div className="bg-gray-300 h-2 rounded-3xl m-2">
                              <div className="bg-blue-400 w-1/4 h-2 rounded-3xl"></div>
                            </div>
                          </div>
                          {/* Details Section */}
                          <div className="flex-col mt-4 bg-white">
                            <div className="flex justify-center">
                              {enrolled?.includes(course._id) ? (
                                <button
                                  className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                  onClick={(e) =>
                                    unregisterCourse(e, course._id)
                                  }
                                >
                                  Unregister
                                </button>
                              ) : (
                                <button
                                  className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                  onClick={(e) => enrollCourse(e, course._id)}
                                >
                                  Enroll
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
