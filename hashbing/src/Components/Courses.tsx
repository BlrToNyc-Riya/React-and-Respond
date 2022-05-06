import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../Images/course1.png";
import SearchBar from "./SearchBar";
import { useNavigate, useParams } from "react-router-dom";
type courseDet = {
  _id: string;
  title: string;
  description: string;
  courseOutcome1: string;
  courseOutcome2: string;
  courseOutcome3: string;
  courseOutcome4: string;
};

function Courses(props: { emailId: string }) {
  const [enrollStatus, setEnrollStatus] = useState(false);
  const [courses, setCourses] = useState<courseDet[]>();
  const [enrolled, setEnrolled] = useState<String[]>([]);
  const email = props.emailId;
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:4000/courses/`;
    // const requestOptions = {
    //   method: "GET",
    //   credentials: "include",
    // };
    const unsubscribe = fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const cou = await response.json();
        console.log(cou);
        setCourses(cou.courses);
      })
      .catch((error) => console.log(error.message));
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const url = `http://localhost:4000/courses/Enrolled/`;
    // const requestOptions = {
    //   method: "GET",
    // };
    const unsubscribe = fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const cou = await response.json();
        console.log(cou);
        setEnrolled(cou.Enrolled);
      })
      .catch((error) => console.log(error.message));
    return () => {
      unsubscribe;
    };
  }, []);
  const enrollCourse = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const url = `http://localhost:4000/courses/${id}/enroll`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    //   credentials: "same-origin",
    // };
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    })
      .then((response) => console.log("Status Changed Successfully"))
      .catch((error) => console.log(error.message));
  };

  const unregisterCourse = (
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
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    })
      .then((response) => console.log("Status Changed Successfully"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex bg-white w-screen rounded-2xl">
      <div className="flex flex-col w-full h-full rounded-2xl">
        <Header selection="courses" />
        <div className="flex flex-col bg-gray-200 w-full h-full rounded-b-2xl shadow-2xl">
          <div className="flex justify-left ml-20 mt-10">
            <span className="flex font-bold text-lg items-center">
              Search Courses:
            </span>
            <SearchBar />
          </div>
          <div className="grid w-full h-full md:grid-cols-3 gap-20 pl-20 pr-20 pt-10 pb-10 grid-cols-1">
            {courses?.map((course) => (
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
                    <div className="flex-col">
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
                          onClick={() => navigate(`/courses/${course?._id}`)}
                        >
                          Go To Details
                        </button>
                      </div>
                      <div className="flex justify-center">
                        {enrolled?.includes(course._id) ? (
                          <button
                            className="text-blue-400 p-3"
                            onClick={(e) => unregisterCourse(e, course._id)}
                          >
                            Enrolled
                          </button>
                        ) : (
                          <button
                            className="text-blue-400 p-3"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
