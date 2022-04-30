import React from "react";
import Header from "./Header";
import logo from "../Images/course1.png";

function Enrolled() {
  return (
    <div className="flex bg-gray-200 w-full h-full rounded-b-2xl shadow-2xl">
      <div className="grid w-full h-full md:grid-cols-3 gap-14 p-10 grid-cols-1">
        <div className="flex bg-white shadow-2xl cursor-pointer">
          <div className="flex-col">
            {/* Img */}
            <div className="flex-col">
              <img src={logo} alt="" className="h-72 w-screen object-fill" />
            </div>
            {/* <div className="flex w-full border-b-2 border-gray-400"></div> */}
            {/* Topic */}
            <div className="">
              <div className="flex-col">
                <p className="text-lg font-sans font-bold text-left pl-2">
                  Modern React Course for Beginners-Foundation Course
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
                  <button className="bg-blue-400 p-3 w-full text-white">
                    Go To Details
                  </button>
                </div>
                <div className="flex justify-center">
                  <button className="text-blue-400 p-3">Enroll</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrolled;
