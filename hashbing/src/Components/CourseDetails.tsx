import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../Images/course1.png";
import {
  faCircleCheck,
  faClipboardCheck,
  faTrash,
  faXmarkSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { createToken } from "../firebase";
import { faXingSquare } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

type courseDetailType = {
  title: string;
  description: string;
  courseOutcome: { [key: string]: string };
  author: string;
  topicsTagged: [string];
  _id: string;
  fileName: string;
  metaData: { timeStamp: number };
};

function CourseDetails () {
  const [course, setCourse] = useState<courseDetailType>();
  const [courses, setCourses] = useState<courseDetailType[]>();
  const params = useParams();
  const [rerender, setRerender] = useState(false);
  const [enrolled, setEnrolled] = useState<String[]>([]);
  const [authored, setAuthored] = useState<String[]>([]);
  const navigate = useNavigate();
  const [dateCreated, setDateCreated] = useState<String>();
  const cid = params.id;

  let updatedCourses: courseDetailType[] | undefined = [];

  const updateRelatedCourses = () => {
    updatedCourses = courses?.filter(
      course1 =>
        course1.topicsTagged === course?.topicsTagged &&
        course1._id !== course?._id
    );
    if (updatedCourses?.length === 0) {
      updatedCourses = courses?.filter(course1 => course1._id !== course?._id);
    }
  };
  updateRelatedCourses();

  useEffect(() => {
    const dateCovert = () => {
      console.log(course);
      if (course?.metaData.timeStamp) {
        var date = new Date(course?.metaData.timeStamp);
        setDateCreated(
          date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
      }
    };
    dateCovert();
    return () => {
      dateCovert;
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/${cid}/`;
      fetch(url, {
        method: "GET",
        headers: header.headers
      })
        .then(async response => {
          const cou = await response.json();
          console.log(cou);
          setCourse(cou);
        })
        .catch(error => console.log(error.message));
    };
    fetchData();
    return () => {
      fetchData;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchData = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/`;
      // const requestOptions = {
      //   method: "GET",
      //   credentials: "include",
      // };
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include"
      })
        .then(async response => {
          const cou = await response.json();
          console.log(cou);
          setCourses(cou.courses);
        })
        .catch(error => console.log(error.message));
    };
    fetchData();
    return () => {
      fetchData;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      const url = `http://localhost:4000/courses/enrolled/`;
      // const requestOptions = {
      //   method: "GET",
      // };
      const header = await createToken();
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include"
      })
        .then(async response => {
          const cou = await response.json();
          console.log(cou);
          setEnrolled(cou.Enrolled);
        })
        .catch(error => console.log(error.message));
    };
    fetchEnrolled();
    return () => {
      fetchEnrolled;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchAuthored = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/authored/`;
      // const requestOptions = {
      //   method: "GET",
      // };
      fetch(url, {
        method: "GET",
        headers: header.headers,
        credentials: "include"
      })
        .then(async response => {
          const cou = await response.json();
          console.log(cou);
          setAuthored(cou.Authored);
        })
        .catch(error => console.log(error.message));
    };
    fetchAuthored();
    return () => {
      fetchAuthored;
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
      credentials: "include"
    })
      .then(response => {
        console.log("Status Changed Successfully");
        setRerender(!rerender);
      })
      .catch(error => console.log(error.message));
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
      credentials: "include"
    })
      .then(response => {
        console.log("Status Changed Successfully");
        setRerender(!rerender);
      })
      .catch(error => console.log(error.message));
  };

  const deleteCourse = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    console.log("entered");
    const header = await createToken();
    const url = `http://localhost:4000/courses/${id}`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    axios
      .delete(url, header)
      .then(response => {
        console.log(response);
        navigate(`/`);
      })
      .catch(error => {
        console.log(error);
      });
    // fetch(url, {
    //   method: 'DELETE',
    //   headers: header.headers,
    //   credentials: 'include',
    // })
    //   .then((response) => {
    //     console.log('Status Changed Successfully');
    //     setRerender(!rerender);
    //   })
    //   .catch((error) => console.log(error.message));
  };

  return (
    <div className='flex bg-white w-screen rounded-2xl'>
      <div className='flex flex-col w-full h-full rounded-2xl'>
        {/* <Header selection='courses' /> */}
        <div className='flex bg-gray-200 h-full rounded-b-2xl'>
          <div className='flex flex-col basis-3/4 h-full'>
            <div className='flex-col w-full h-full'>
              <div className='flex m-10 p-6 align-middle items-center rounded-2xl h-full bg-blue-600 shadow-2xl'>
                <div className='flex-col'>
                  <br />
                  <p className='text-4xl text-white font-sans font-bold text-left pl-10'>
                    {course?.title}
                  </p>
                  <br />
                  <p className='text-xl text-white font-sans font-bold text-left pl-10'>
                    {course?.description}
                  </p>
                  <br />
                  <p className='text-sm text-white font-sans font-bold pl-10'>
                    Created by :
                    <span className='text-sm font-sans font-semibold pl-2'>
                      {course?.author}
                    </span>
                  </p>
                  <br />
                  <p className='text-sm text-white font-sans font-bold pl-10'>
                    Last Updated on :
                    <span className='text-sm font-sans font-semibold pl-2'>
                      {dateCreated?.toString()}
                    </span>
                  </p>
                  {/* Tags */}
                  <div className='flex-grow mt-4 break-word ml-5 mr-5'>
                    {course?.topicsTagged?.map(tag => (
                      <span
                        className='text-xs font-semibold text-center py-1 px-2 rounded bg-white uppercase m-4 break-all text-blue-600 border'
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full mb-10 mt-10 h-full'>
              <div className='flex rounded-xl align-middle items-center m-10 h-full bg-white shadow-2xl'>
                <div className='flex-col p-10 w-full'>
                  <p className='text-3xl font-sans font-bold text-left pl-10 pb-10'>
                    What You will Learn
                  </p>
                  <br />
                  <div className='flex flex-wrap'>
                    {course &&
                      Object.keys(course.courseOutcome)?.map(id => (
                        <div
                          className='text-lg font-sans text-left pl-10 w-1/2'
                          key={id}
                        >
                          <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                          {course?.courseOutcome[id]}
                        </div>
                      ))}
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full mb-10 mt-10 h-full'>
              <p className='text-3xl font-sans font-bold text-left pl-10 pb-10'>
                Related Courses
              </p>
              <div className='grid w-full h-full md:grid-cols-3 gap-20 pl-20 pr-20 pt-10 pb-10 grid-cols-1'>
                {updatedCourses?.map(
                  (course1, i) =>
                    i <= 2 && (
                      <div
                        className='flex bg-white shadow-2xl cursor-pointer max-w-full'
                        key={course1._id}
                      >
                        <div className='flex-col max-w-full'>
                          {/* Img */}
                          <div className='flex-col'>
                            <img
                              src={
                                course1?.fileName
                                  ? `/src/Images/${course1.fileName}`
                                  : `/src/Images/HPE-Course-Placeholder-Image-1.jpeg`
                              }
                              alt={course1.title}
                              className='h-50 w-screen object-fill'
                            />
                          </div>
                          {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                          {/* Topic */}
                          <div className=''>
                            <div className='flex-col min-h-16'>
                              <p className='text-lg font-sans font-bold text-left pl-2'>
                                {course1?.title}
                              </p>
                            </div>
                            {/* Author */}
                            <div className='flex-col'>
                              <p className='text-xs font-sans font-semibold pl-2 text-gray-500'>
                                Created by :{" "}
                                <span className='text-black'>
                                  {course1?.author}
                                </span>
                              </p>
                            </div>
                            {/* Tags */}
                            <div className='flex flex-wrap mt-4 break-word'>
                              {course1?.topicsTagged?.map(tag => (
                                <span
                                  className='text-xs font-semibold text-center py-1 px-2 rounded text-white bg-blue-600 uppercase m-4 break-all border'
                                  key={tag}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {/* Details Section */}
                            <div className='flex-col mt-4'>
                              <div className='flex justify-center'>
                                <button
                                  className='bg-blue-600 p-3 w-4/5 mb-4 text-white'
                                  onClick={() => {
                                    navigate(`/courses/${course1?._id}`);
                                    window.location.reload();
                                  }}
                                >
                                  Go To Details
                                </button>
                              </div>
                              <div className='flex justify-center mb-2'>
                                {authored?.includes(course1._id) ? (
                                  <button
                                    className='bg-red-600 text-white p-3'
                                    onClick={e => deleteCourse(e, course1._id)}
                                  >
                                    Delete Course &nbsp;
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className='relative'
                                      color={"white"}
                                      size={"1x"}
                                    />
                                  </button>
                                ) : enrolled?.includes(course1._id) ? (
                                  <button
                                    className='text-blue-600 p-3'
                                    onClick={e =>
                                      unregisterCourse(e, course1._id)
                                    }
                                  >
                                    Unregister&nbsp;
                                    <FontAwesomeIcon
                                      icon={faXmarkSquare}
                                      className='relative'
                                      color={"#2563EB"}
                                      size={"1x"}
                                    />
                                  </button>
                                ) : (
                                  <button
                                    className='text-blue-600 p-3'
                                    onClick={e => enrollCourse(e, course1._id)}
                                  >
                                    Enroll &nbsp;
                                    <FontAwesomeIcon
                                      icon={faClipboardCheck}
                                      className='relative'
                                      color={"#2563EB"}
                                      size={"1x"}
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
            </div>
            {/* <p className='text-4xl font-sans font-bold text-left pl-10'>
              Course Content
            </p>
            <div className='flex-col w-full mb-20 h-full'>
              <div className='flex align-middle items-center m-10 h-full bg-white shadow-2xl'>
                <div className='flex-col'>
                  <p className='text-2xl font-sans font-bold text-left pl-10'>
                    What You will Learn
                  </p>
                  <br />
                  <div className='flex flex-wrap'>
                    <p className='text-xs font-sans text-left pl-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />{' '}
                      {course?.courseOutcome1}
                    </p>
                    <br />

                    <p className='text-xs font-sans text-left pl-10 w-1/2'>
                      {' '}
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />
                      {course?.courseOutcome2}
                    </p>
                    <br />
                    <p className='text-xs font-sans text-left pl-10 pt-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />{' '}
                      {course?.courseOutcome3}
                    </p>

                    <p className='text-xs font-sans pl-10 pt-10 w-1/2'>
                      <FontAwesomeIcon icon={faCircleCheck} size={'1x'} />
                      {course?.courseOutcome4}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className='flex flex-col basis-1/5 rounded-br-2xl h-full relative'>
            <div className='flex-col h-10'></div>
            <div className='flex cursor-pointer h-96 fixed'>
              <div className='flex-col h-full mr-20 mt-10 bg-white shadow-2xl'>
                {/* Img */}
                <div className='flex justify-center'>
                  <img
                    src={
                      course?.fileName
                        ? `/src/Images/${course.fileName}`
                        : `/src/Images/HPE-Course-Placeholder-Image-1.jpeg`
                    }
                    alt={course?.title}
                    className='h-40 w-full object-fill'
                  />
                </div>
                {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                {/* Topic */}
                <div className='flex-col'>
                  <div className='flex-col min-h-16'>
                    <p className='text-xl font-sans font-bold text-center pl-2'>
                      {course?.title}
                    </p>
                  </div>
                  {/* Tags */}
                  <div className='flex-grow ml-4'>
                    {course?.topicsTagged?.map(tag => (
                      <span
                        className='text-xs font-semibold text-center py-1 px-2 rounded bg-blue-600 uppercase m-4 break-all text-white'
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Details Section */}
                  <div className='flex-col mt-4 bg-white'>
                    <div className='flex justify-center'>
                      {cid != undefined && authored?.includes(cid) ? (
                        <button
                          className='bg-red-600 p-3 w-4/5 mb-4 text-white'
                          onClick={e => deleteCourse(e, cid)}
                        >
                          Delete Course &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            className='relative'
                            color={"white"}
                            size={"1x"}
                          />
                        </button>
                      ) : cid != undefined && enrolled?.includes(cid) ? (
                        <button
                          className='bg-blue-600 p-3 w-4/5 mb-4 text-white'
                          onClick={e => unregisterCourse(e, cid)}
                        >
                          Unregister &nbsp;
                          <FontAwesomeIcon
                            icon={faXmarkSquare}
                            className='relative'
                            color={"white"}
                            size={"1x"}
                          />
                        </button>
                      ) : (
                        cid != undefined && (
                          <button
                            className='bg-blue-600 p-3 w-4/5 mb-4 text-white'
                            onClick={e => enrollCourse(e, cid)}
                          >
                            Enroll &nbsp;
                            <FontAwesomeIcon
                              icon={faClipboardCheck}
                              className='relative'
                              color={"white"}
                              size={"1x"}
                            />
                          </button>
                        )
                      )}
                    </div>
                    <div className='flex justify-center'>
                      {cid != undefined && enrolled?.includes(cid) && (
                        <button
                          className='text-blue-600 p-3'
                          onClick={() =>
                            !course ? null : navigate(`/course/${course._id}`)
                          }
                        >
                          Start Learning
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-1/12 h-full'></div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
