import React from "react";
import Header from "./Header";
import logo from "../Images/course1.png";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CourseDetails() {
  return (
    <div className="flex min-h-screen min-w-screen bg-sky-400">
      <div className="flex bg-white m-20 w-screen rounded-2xl">
        <div className="flex flex-col w-full h-full rounded-2xl">
          <Header />
          <div className="flex bg-gray-200 h-full rounded-b-2xl">
            <div className="flex flex-col basis-3/4 h-full">
              <div className="flex-col w-full h-full">
                <div className="flex m-10  align-middle items-center rounded-2xl h-full bg-sky-400 shadow-2xl">
                  <div className="flex-col">
                    <br />
                    <p className="text-4xl text-white font-sans font-bold text-left pl-10">
                      Modern React Course for Beginners-Foundation Course
                    </p>
                    <br />
                    <p className="text-md text-white font-sans font-bold text-left pl-10">
                      Dive in and learn React.js from scratch! Learn Reactjs,
                      Hooks, Redux, React Routing, Animations, Next.js and way
                      more!
                    </p>
                    <br />
                    <p className="text-sm text-white font-sans font-bold pl-10">
                      Created by
                      <span className="text-xs font-sans font-semibold pl-2 text-black">
                        Govind Radhakrishnan
                      </span>
                    </p>
                    <br />
                    <p className="text-sm text-white font-sans font-bold pl-10">
                      Last Updated on
                      <span className="text-xs font-sans font-semibold pl-2 text-black">
                        15/05/2021
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-col w-full mb-20 mt-10 h-full">
                <div className="flex align-middle items-center m-10 h-full bg-white shadow-2xl">
                  <div className="flex-col">
                    <p className="text-2xl font-sans font-bold text-left pl-10">
                      What You will Learn
                    </p>
                    <br />
                    <div className="flex flex-wrap">
                      <p className="text-xs font-sans text-left pl-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Build powerful, fast, user-friendly and reactive web
                        apps.
                      </p>
                      <br />

                      <p className="text-xs font-sans text-left pl-10 w-1/2">
                        {" "}
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />
                        Apply for high-paid jobs or work as a freelancer in one
                        the most-demanded sectors you can find in web dev right
                        now
                      </p>
                      <br />
                      <p className="text-xs font-sans text-left pl-10 pt-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Provide amazing user experiences by leveraging the power
                        of JavaScript with ease
                      </p>

                      <p className="text-xs font-sans pl-10 pt-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Learn all about React Hooks and React Components
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-4xl font-sans font-bold text-left pl-10">
                Course Content
              </p>
              <div className="flex-col w-full mb-20 h-full">
                <div className="flex align-middle items-center m-10 h-full bg-white shadow-2xl">
                  <div className="flex-col">
                    <p className="text-2xl font-sans font-bold text-left pl-10">
                      What You will Learn
                    </p>
                    <br />
                    <div className="flex flex-wrap">
                      <p className="text-xs font-sans text-left pl-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Build powerful, fast, user-friendly and reactive web
                        apps.
                      </p>
                      <br />

                      <p className="text-xs font-sans text-left pl-10 w-1/2">
                        {" "}
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />
                        Apply for high-paid jobs or work as a freelancer in one
                        the most-demanded sectors you can find in web dev right
                        now
                      </p>
                      <br />
                      <p className="text-xs font-sans text-left pl-10 pt-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Provide amazing user experiences by leveraging the power
                        of JavaScript with ease
                      </p>

                      <p className="text-xs font-sans pl-10 pt-10 w-1/2">
                        <FontAwesomeIcon icon={faCircleCheck} size={"1x"} />{" "}
                        Learn all about React Hooks and React Components
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col basis-1/5 rounded-br-2xl h-full">
              <div className="flex-col h-10"></div>
              <div className="flex shadow-2xl cursor-pointer h-96 sticky top-10">
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
                    <div className="flex-col">
                      <p className="text-lg font-sans font-bold text-center pl-2">
                        Modern React Course for Beginners-Foundation Course
                      </p>
                    </div>
                    {/* Details Section */}
                    <div className="flex-col mt-4 bg-white">
                      <div className="flex justify-center">
                        <button className="bg-sky-400 p-3 w-4/5 text-white">
                          Enroll
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button className="text-sky-400 p-3">
                          Start Learning
                        </button>
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
    </div>
  );
}

export default CourseDetails;
