import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../Images/HPE-Course-Placeholder-Image-1.jpeg";
import SearchBar from "./SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { createToken } from "../firebase";
import axios from "axios";
import {
  faCircleCheck,
  faClipboardCheck,
  faTrash,
  faXmarkSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type courseDet = {
  _id: string;
  title: string;
  description: string;
  author: string;
  fileName: string;
  courseOutcome1: string;
  courseOutcome2: string;
  courseOutcome3: string;
  courseOutcome4: string;
  topicsTagged: [string];
};

function Courses () {
  const [rerender, setRerender] = useState(false);
  const [courses, setCourses] = useState<courseDet[]>();
  const [coursesRef, setCoursesRef] = useState<courseDet[]>();
  const [authored, setAuthored] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

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
          setCoursesRef(cou.courses);
        })
        .catch(error => console.log(error.message));
    };
    fetchData();
    return () => {
      fetchData;
    };
  }, [rerender]);

  useEffect(() => {
    const fetchToken = async () => {
      const header = await createToken();
      try {
        const { data } = await axios.get(
          "http://localhost:4000/courses/enrolled/",
          header
        );
        console.log("data>>", data);
        setEnrolled(data.Enrolled);
      } catch (error) {
        const typedError = error as Error;
        console.log("error>>", error);
        setError(typedError.message);
      }
    };
    fetchToken();
    return () => {
      fetchToken;
    };
    // axios
    //   .get(url, header)
    //   .then(async response => {
    //     const cou = await response.json()
    //     console.log(cou)
    //     setEnrolled(cou.Enrolled)
    //   })
    //   .catch(error => console.log(error.message))
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
          console.log("Authored", cou);
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
    console.log("header", header);

    axios
      .put(url, { title: "Axios PUT Request Example" }, header)
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
    const url = `http://localhost:4000/courses/${id}/unregister`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    const header = await createToken();
    axios
      .put(url, { test: 123 }, header)
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
        setRerender(!rerender);
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

  const onSearch = (search: string) => {
    if (search === "") {
      return setCourses(coursesRef);
    }
    const filteredCourses = coursesRef?.filter(course => {
      return course.title.toLowerCase().includes(search.toLowerCase());
    });
    setCourses(filteredCourses);
  };

  return (
    <div className='flex bg-white w-screen rounded-2xl'>
      <div className='flex flex-col w-full h-full rounded-2xl'>
        {/* <Header selection='courses' /> */}
        <div className='flex flex-col bg-gray-200 w-full h-full min-h-screen rounded-b-2xl shadow-2xl'>
          <div className='flex justify-left ml-20 mt-10'>
            <span className='flex font-bold text-lg items-center'>
              Search Courses:
            </span>
            <SearchBar onSearch={onSearch} />
          </div>
          {courses?.length === 0 ? (
            <div className='flex bg-gray-200 min-h-screen rounded-b-2xl shadow-2xl items-center justify-center h-3/4'>
              <p className='text-xl font-semibold'>
                No Courses available to display. Feel free to add a new course!
              </p>
            </div>
          ) : (
            <div className='grid w-full h-full md:grid-cols-3 gap-20 pl-20 pr-20 pt-10 pb-10 grid-cols-1'>
              {courses?.map(course => (
                <div
                  className='flex bg-white shadow-2xl cursor-pointer max-w-full'
                  key={course._id}
                >
                  <div className='flex-col max-w-full'>
                    {/* Img */}
                    <div className='flex-col'>
                      <img
                        src={
                          course.fileName
                            ? `/src/Images/${course.fileName}`
                            : `/src/Images/HPE-Course-Placeholder-Image-1.jpeg`
                        }
                        alt=''
                        className='h-72 w-screen object-fill'
                      />
                    </div>
                    {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                    {/* Topic */}
                    <div className=''>
                      <div className='flex-col min-h-16'>
                        <p className='text-lg font-sans font-bold text-left pl-2 break-all'>
                          {course?.title}
                        </p>
                      </div>
                      {/* Author */}
                      <div className='flex-col'>
                        <p className='text-xs font-sans font-semibold pl-2 text-gray-500'>
                          Created by :{" "}
                          <span className='text-black'>{course?.author}</span>
                        </p>
                      </div>
                      {/* Tags */}
                      <div className='flex-grow mt-4'>
                        {course?.topicsTagged?.map(tag => (
                          <span
                            className='text-xs font-semibold text-center py-1 px-2 rounded text-cyan-600 bg-blue-200 uppercase m-4 break-all'
                            key={`tag-${course._id}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Details Section */}
                      <div className='flex-col mt-4'>
                        <div className='flex justify-center'>
                          <button
                            className='bg-blue-400 p-3 w-full text-white'
                            onClick={() => navigate(`/courses/${course?._id}`)}
                          >
                            Go To Details
                          </button>
                        </div>
                        <div className='flex justify-center'>
                          {authored?.includes(course._id) ? (
                            <button
                              className='text-blue-400 p-3'
                              onClick={e => deleteCourse(e, course._id)}
                            >
                              Delete Course &nbsp;
                              <FontAwesomeIcon
                                icon={faTrash}
                                className='relative'
                                color={"#60A5FA"}
                                size={"1x"}
                              />
                            </button>
                          ) : enrolled?.includes(course._id) ? (
                            <button
                              className='text-blue-400 p-3'
                              onClick={e => unregisterCourse(e, course._id)}
                            >
                              Unregister&nbsp;
                              <FontAwesomeIcon
                                icon={faXmarkSquare}
                                className='relative'
                                color={"#60A5FA"}
                                size={"1x"}
                              />
                            </button>
                          ) : (
                            <button
                              className='text-blue-400 p-3'
                              onClick={e => enrollCourse(e, course._id)}
                            >
                              Enroll &nbsp;
                              <FontAwesomeIcon
                                icon={faClipboardCheck}
                                className='relative'
                                color={"#60A5FA"}
                                size={"1x"}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
