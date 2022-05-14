import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import {
  faClipboardCheck,
  faEdit,
  faPencil,
  faPencilAlt,
  faTrash,
  faUser,
  faXmarkSquare,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { IconProps } from '@mui/material';
import axios from 'axios';
import React, {
  FormEventHandler,
  HTMLProps,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../firebase';
import logo from '../Images/course1.png';
import logo1 from '../public/uploads/IMAGE-1651806371090.jpeg';
import Header from './Header';
type courseDet = {
  _id: string;
  title: string;
  description: string;
  courseOutcome1: string;
  courseOutcome2: string;
  courseOutcome3: string;
  courseOutcome4: string;
  topicsTagged: [string];
  author: string;
};

type userDetail = {
  _id: string;
  email: string;
  coursesEnrolled: [string];
  courseAuthored: [string];
  firstName: string;
  lastName: string;
};
function Users() {
  const [images, setImages] = useState<File>();
  const [profilePic, setProfilePic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const [courses, setCourses] = useState<courseDet[]>();
  const navigate = useNavigate();
  const [selection, setSelection] = useState('Profile');
  const [rerender, setRerender] = useState(false);
  const [toggleEditFirstName, setToggleEditFirstName] = useState(false);
  const [toggleEditLastName, setToggleEditLastName] = useState(false);
  const [authored, setAuthored] = useState<String[]>();
  const [enrolled, setEnrolled] = useState<String[]>([]);
  const [user, setUser] = useState<userDetail>();
  const profileField = useRef<HTMLDivElement>(null);
  const enrolledField = useRef<HTMLDivElement>(null);
  const authoredField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selection === 'Profile') {
      if (
        profileField.current != null &&
        enrolledField.current != null &&
        authoredField.current != null
      ) {
        profileField.current.style.backgroundColor = '#60A5FA';
        enrolledField.current.style.backgroundColor = 'white';
        authoredField.current.style.backgroundColor = 'white';
      }
    } else if (selection === 'Enrolled') {
      if (
        profileField.current != null &&
        enrolledField.current != null &&
        authoredField.current != null
      ) {
        enrolledField.current.style.backgroundColor = '#60A5FA';
        profileField.current.style.backgroundColor = 'white';
        authoredField.current.style.backgroundColor = 'white';
      }
    } else if (selection === 'Authored') {
      if (
        profileField.current != null &&
        enrolledField.current != null &&
        authoredField.current != null
      ) {
        authoredField.current.style.backgroundColor = '#60A5FA';
        enrolledField.current.style.backgroundColor = 'white';
        profileField.current.style.backgroundColor = 'white';
      }
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/users/profile`;
      // const requestOptions = {
      //   method: "GET",
      //   credentials: "include",
      // };
      fetch(url, {
        method: 'GET',
        headers: header.headers,
        credentials: 'include',
      })
        .then(async (response) => {
          const userDetails = await response.json();
          console.log(userDetails);
          setUser(userDetails);
        })
        .catch((error) => console.log(error.message));
    };
    fetchUser();
    return () => {
      fetchUser;
    };
  }, [rerender]);
  useEffect(() => {
    const fetchCourses = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/`;
      // const requestOptions = {
      //   method: "GET",
      //   credentials: "include",
      // };
      fetch(url, {
        method: 'GET',
        headers: header.headers,
        credentials: 'include',
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
        method: 'GET',
        headers: header.headers,
        credentials: 'include',
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
      method: 'PUT',
      headers: header.headers,
      credentials: 'include',
    })
      .then((response) => {
        console.log('Status Changed Successfully');
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
      method: 'PUT',
      headers: header.headers,
      credentials: 'include',
    })
      .then((response) => {
        console.log('Status Changed Successfully');
        setRerender(!rerender);
      })
      .catch((error) => console.log(error.message));
  };

  const deleteCourse = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const header = await createToken();
    const url = `http://localhost:4000/courses/${id}/delete`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: 'DELETE',
      headers: header.headers,
      credentials: 'include',
    })
      .then((response) => {
        console.log('Status Changed Successfully');
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
        method: 'GET',
        headers: header.headers,
        credentials: 'include',
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
      formData.append('myImage', images);
    }
    console.log(formData.get('myImage'));
    const url = 'http://localhost:4000/users/upload';
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

  const onProfileChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const header = await createToken();
    const url = 'http://localhost:4000/users/profile';
    // const config = {
    //   headers: { "content-Type": "multipart/form-data" },
    // };
    axios
      .put(url, header)
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
                        size={'5x'}
                        color={'grey'}
                        className="relative"
                      />
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="relative bottom-4 left-36"
                    color={'black'}
                    id="pencil_icon"
                    onClick={uploadTrigger}
                  />{' '}
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
          <div className="flex w-screen bg-white">
            <div
              className="flex justify-center border-2 border-black w-1/3 p-2 text-xl font-semibold cursor-pointer"
              onClick={() => setSelection('Profile')}
              ref={profileField}
            >
              Profile
            </div>
            <div
              className="flex justify-center border-2 border-black w-1/3 p-2 text-xl font-semibold cursor-pointer"
              onClick={() => setSelection('Enrolled')}
              ref={enrolledField}
            >
              Enrolled
            </div>
            <div
              className="flex justify-center border-2 border-black w-1/3 p-2 text-xl font-semibold cursor-pointer"
              onClick={() => setSelection('Authored')}
              ref={authoredField}
            >
              Authored
            </div>
          </div>
          {selection === 'Profile' ? (
            <div className="flex p-20 justify-left ml-10 h-screen">
              <form onSubmit={onProfileChange}>
                <p className="font-bold text-lg">
                  First Name:
                  {toggleEditFirstName == false ? (
                    <span>
                      <span className="font-semibold ml-1 mr-1">
                        {user?.firstName}
                      </span>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="relative"
                        color={'black'}
                        size={'1x'}
                        id="pencil_icon_1"
                        onClick={() =>
                          setToggleEditFirstName(!toggleEditFirstName)
                        }
                      />
                    </span>
                  ) : (
                    <span>
                      <input
                        type="text"
                        className=" bg-sky-200 placeholder-black"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />{' '}
                      &nbsp;
                      <button className="bg-sky-400 p-1 mb-4 text-white text-sm">
                        Submit
                      </button>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="relative"
                        color={'black'}
                        size={'1x'}
                        id="pencil_icon_1"
                        onClick={() =>
                          setToggleEditFirstName(!toggleEditFirstName)
                        }
                      />
                    </span>
                  )}
                </p>
                <br />
                <p className="font-bold text-lg">
                  Last Name:
                  {toggleEditLastName == false ? (
                    <span>
                      <span className="font-semibold ml-1 mr-1">
                        {user?.lastName}
                      </span>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="relative"
                        color={'black'}
                        size={'1x'}
                        onClick={() =>
                          setToggleEditLastName(!toggleEditLastName)
                        }
                      />
                    </span>
                  ) : (
                    <span>
                      <input
                        type="text"
                        className=" bg-sky-200 placeholder-black"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />{' '}
                      &nbsp;
                      <button className="bg-sky-400 p-1 mb-4 text-white text-sm">
                        Submit
                      </button>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="relative"
                        color={'black'}
                        size={'1x'}
                        onClick={() =>
                          setToggleEditLastName(!toggleEditLastName)
                        }
                      />
                    </span>
                  )}
                </p>
                <br />
                <p className="font-bold text-lg">
                  Email:
                  <span className="font-semibold ml-2">{user?.email}</span>
                </p>
              </form>
            </div>
          ) : selection === 'Enrolled' ? (
            <div className="flex flex-col justify-left ml-4 mb-10 h-screen">
              {enrolled?.length === 0 ? (
                <div className="flex bg-gray-200 min-h-screen rounded-b-2xl p-20 shadow-2xl items-start justify-center h-3/4">
                  <p className="text-xl font-semibold">
                    No Courses enrolled by the user. Enroll for a course and
                    come back!
                  </p>
                </div>
              ) : (
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
                              <div className="flex-col">
                                <p className="text-xs font-sans font-semibold pl-2 text-gray-500">
                                  Created by:{' '}
                                  <span className="text-black">
                                    {course?.author}
                                  </span>
                                </p>
                              </div>
                              {/* Tags */}
                              <div className="flex-grow mt-4">
                                {course?.topicsTagged?.map((tag) => (
                                  <span
                                    className="text-xs font-semibold text-center py-1 px-2 rounded text-cyan-600 bg-blue-200 uppercase m-4"
                                    key={tag}
                                  >
                                    {tag}
                                  </span>
                                ))}
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
                                      Unregister &nbsp;
                                      <FontAwesomeIcon
                                        icon={faXmarkSquare}
                                        className="relative"
                                        color={'white'}
                                        size={'1x'}
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                      onClick={(e) =>
                                        enrollCourse(e, course._id)
                                      }
                                    >
                                      Enroll &nbsp;
                                      <FontAwesomeIcon
                                        icon={faClipboardCheck}
                                        className="relative"
                                        color={'white'}
                                        size={'1x'}
                                      />
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
              )}
            </div>
          ) : selection === 'Authored' ? (
            <div className="flex flex-col justify-left ml-4 h-screen">
              {authored?.length === 0 ? (
                <div className="flex bg-gray-200 min-h-screen rounded-b-2xl p-20 shadow-2xl items-start justify-center h-3/4">
                  <p className="text-xl font-semibold">
                    The user has not authored any Courses! Feel free to add a
                    new course!
                  </p>
                </div>
              ) : (
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
                              <div className="flex-col">
                                <p className="text-xs font-sans font-semibold pl-2 text-gray-500">
                                  Created by:{' '}
                                  <span className="text-black">
                                    {course?.author}
                                  </span>
                                </p>
                              </div>
                              {/* Tags */}
                              <div className="flex-grow mt-4">
                                {course?.topicsTagged?.map((tag) => (
                                  <span
                                    className="text-xs font-semibold text-center py-1 px-2 rounded text-cyan-600 bg-blue-200 uppercase m-4"
                                    key={tag}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              {/* Details Section */}
                              <div className="flex-col mt-4 bg-white">
                                <div className="flex justify-center">
                                  <button
                                    className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                                    onClick={(e) => deleteCourse(e, course._id)}
                                  >
                                    Delete Course &nbsp;
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="relative"
                                      color={'white'}
                                      size={'1x'}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
