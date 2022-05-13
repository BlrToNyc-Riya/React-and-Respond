import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../Images/course1.png";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { createToken } from "../firebase";
type courseDet = {
  _id: string;
  title: string;
  description: string;
  courseOutcome1: string;
  courseOutcome2: string;
  courseOutcome3: string;
  courseOutcome4: string;
};

function Enrolled() {
  const [rerender, setRerender] = useState(false);
  const [courses, setCourses] = useState<courseDet[]>();
  const [enrolled, setEnrolled] = useState<String[]>([]);
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
    const fetchToken = async () => {
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
    fetchToken();
    return () => {
      fetchToken;
    };
  }, [rerender]);

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
    <div className="flex bg-white w-screen  rounded-2xl">
      <div className="flex flex-col w-full h-full rounded-2xl">
        {/* <Header selection="enrolled" /> */}
        <div className="flex bg-gray-200 w-full h-full min-h-screen rounded-b-2xl shadow-2xl">
          <div className="grid w-full h-full md:grid-cols-3 gap-20 p-20 grid-cols-1">
            {courses?.map(
              (course) =>
                enrolled.includes(course._id) && (
                  <div
                    className="flex bg-white shadow-2xl cursor-pointer"
                    key={course._id}
                  >
                    <div className="flex-col">
                      {/* Img */}
                      <div className="flex-col">
                        <img
                          src={logo}
                          alt=""
                          className="h-72 w-screen object-fill"
                        />
                      </div>
                      {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
                      {/* Topic */}
                      <div className="">
                        <div className="flex-col min-h-16">
                          <p className="text-lg font-sans font-bold text-left pl-2">
                            {course?.title}
                          </p>
                        </div>
                        {/* Author */}
                        <div className="flex-col mt-4">
                          <p className="text-xs font-sans font-semibold pl-2 text-gray-500">
                            Govind Radhakrishnan
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
                        <div className="flex-col mt-4">
                          <div className="flex justify-center">
                            <button
                              className="bg-blue-400 p-3 w-full text-white"
                              onClick={() =>
                                navigate(`/courses/${course?._id}`)
                              }
                            >
                              Go To Details
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="text-blue-400 p-3"
                              onClick={(e) => unregisterCourse(e, course._id)}
                            >
                              Unregister
                            </button>
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
  );
}

export default Enrolled;
