import {
  faEdit,
  faPencil,
  faPencilAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../Images/course1.png";
import Header from "./Header";

function Users() {
  return (
    <div className="flex bg-white w-screen rounded-2xl">
      <div className="flex flex-col w-full h-full rounded-2xl">
        <Header selection="users" />
        <div className="flex flex-col bg-gray-200 w-full h-full rounded-b-2xl shadow-2xl">
          <div className="flex w-full justify-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="bg-white mt-4 p-14 rounded-full">
                  <FontAwesomeIcon
                    icon={faUser}
                    size={"5x"}
                    color={"grey"}
                    className="relative left-2"
                  />
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="relative top-16 left-6"
                    color={"black"}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="flex flex-col justify-left ml-10">
            <p className="font-bold text-xl text-center underline mb-6">
              Profile :
            </p>
            <p className="font-bold text-lg">
              Name:
              <span className="font-semibold ml-1 mr-1">John</span>
              <span className="font-semibold">Wick</span>
            </p>
            <p className="font-bold text-lg">
              Email:
              <span className="font-semibold ml-2">Johnwick@hotmail.com</span>
            </p>
          </div>
          <br />
          <div className="flex flex-col justify-left ml-4 mb-10">
            <p className="font-bold text-xl text-center underline mb-2">
              Enrolled Courses :
            </p>
            <div className="grid w-full h-full md:grid-cols-4 gap-20 p-10 grid-cols-1">
              <div className="flex cursor-pointer h-80 top-10">
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
                        <button className="bg-sky-400 p-3 w-4/5 mb-4 text-white">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-left ml-4 m">
            <p className="font-bold text-xl text-center underline mb-2">
              Courses Authored:
            </p>
            <div className="grid w-full h-full md:grid-cols-4 gap-20 p-10 grid-cols-1">
              <div className="flex cursor-pointer h-80 top-10">
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
                        <button className="bg-sky-400 p-3 w-4/5 mb-4 text-white">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
