import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../Images/course1.png";
import {
  faCircleCheck,
  faClipboardCheck,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { createToken } from "../firebase";
import { faXingSquare } from "@fortawesome/free-brands-svg-icons";

type courseDetailType = {
  title: string;
  description: string;
  courseOutcome: { [key: string]: string };
  author: string;
  topicsTagged: [string];
  _id: string;
  metaData: { timeStamp: number };
};

function CourseDetails() {
  const [course, setCourse] = useState<courseDetailType>();
  const [courses, setCourses] = useState<courseDetailType[]>();
  const params = useParams();
  const [rerender, setRerender] = useState(false);
  const [enrolled, setEnrolled] = useState<String[]>([]);
  const navigate = useNavigate();
  const [dateCreated, setDateCreated] = useState<String>();
  const cid = params.id;

  useEffect(() => {
    console.log(course);
    if (course?.metaData.timeStamp) {
      var date = new Date(course?.metaData.timeStamp);
      setDateCreated(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/courses/${cid}/`;
      fetch(url, {
        method: "GET",
        headers: header.headers,
      })
        .then(async (response) => {
          const cou = await response.json();
          console.log(cou);
          setCourse(cou);
        })
        .catch((error) => console.log(error.message));
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
        credentials: "include",
      })
        .then(async (response) => {
          const cou = await response.json();
          console.log(cou);
          setCourses(cou.courses);
        })
        .catch((error) => console.log(error.message));
    };
    fetchData();
    return () => {
      fetchData;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      const url = `http://localhost:4000/courses/Enrolled/`;
      // const requestOptions = {
      //   method: "GET",
      // };
      const header = await createToken();
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

  return (
    <div className="flex bg-white w-screen rounded-2xl">
      <div className="flex flex-col w-full h-full rounded-2xl">
        {/* <Header selection='courses' /> */}
        <div className="flex bg-gray-200 h-full rounded-b-2xl">
          <div className="flex flex-col basis-3/4 h-full">
            <div className="flex-col w-full h-full">
              <div className="flex m-10 p-6 align-middle items-center rounded-2xl h-full bg-sky-400 shadow-2xl">
                <div className="flex-col">
                  <br />
                  <p className="text-4xl text-white font-sans font-bold text-left pl-10">
                    {course?.title}
                  </p>
                  <br />
                  <p className="text-xl text-white font-sans font-bold text-left pl-10">
                    {course?.description}
                  </p>
                  <br />
                  <p className="text-sm text-white font-sans font-bold pl-10">
                    Created by :
                    <span className="text-sm font-sans font-semibold pl-2 text-black">
                      {course?.author}
                    </span>
                  </p>
                  <br />
                  <p className="text-sm text-white font-sans font-bold pl-10">
                    Last Updated on :
                    <span className="text-sm font-sans font-semibold pl-2 text-black">
                      {dateCreated?.toString()}
                    </span>
                  </p>
                  {/* Tags */}
                  <div className="flex-grow mt-4 ml-5 mr-5">
                    {course?.topicsTagged?.map((tag) => (
                      <span
                        className="text-xs font-semibold text-center py-1 px-2 rounded text-cyan-600 bg-blue-200 uppercase m-4"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mb-10 mt-10 h-full">
              <div className="flex rounded-xl align-middle items-center m-10 h-full bg-white shadow-2xl">
                <div className="flex-col p-10 w-full">
                  <p className="text-3xl font-sans font-bold text-left pl-10 pb-10">
                    What You will Learn
                  </p>
                  <br />
                  <div className="flex flex-wrap">
                    {course &&
                      Object.keys(course.courseOutcome)?.map((id) => (
                        <div
                          className="text-lg font-sans text-left pl-10 w-1/2"
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
          <div className="flex flex-col basis-1/5 rounded-br-2xl h-full relative">
            <div className="flex-col h-10"></div>
            <div className="flex cursor-pointer h-96 fixed">
              <div className="flex-col h-full mr-20 mt-10 bg-white shadow-2xl">
                {/* Img */}
                <div className="flex justify-center">
                  <img src={logo} alt="" className="h-40 w-full object-fill" />
                </div>
                {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                {/* Topic */}
                <div className="flex-col">
                  <div className="flex-col min-h-16">
                    <p className="text-xl font-sans font-bold text-center pl-2">
                      {course?.title}
                    </p>
                  </div>
                  {/* Tags */}
                  <div className="flex-grow ml-4">
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
                      {cid != undefined && enrolled?.includes(cid) ? (
                        <button
                          className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                          onClick={(e) => unregisterCourse(e, cid)}
                        >
                          Unregister &nbsp;
                          <FontAwesomeIcon
                            icon={faXmarkSquare}
                            className="relative"
                            color={"white"}
                            size={"1x"}
                          />
                        </button>
                      ) : (
                        cid != undefined && (
                          <button
                            className="bg-sky-400 p-3 w-4/5 mb-4 text-white"
                            onClick={(e) => enrollCourse(e, cid)}
                          >
                            Enroll &nbsp;
                            <FontAwesomeIcon
                              icon={faClipboardCheck}
                              className="relative"
                              color={"white"}
                              size={"1x"}
                            />
                          </button>
                        )
                      )}
                    </div>
                    <div className="flex justify-center">
                      {cid != undefined && enrolled?.includes(cid) && (
                        <button
                          className="text-sky-400 p-3"
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
          <div className="basis-1/12 h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
