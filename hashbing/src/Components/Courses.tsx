import React from "react";
import CourseListing from "./CourseListing";
import Header from "./Header";

function Courses() {
  return (
    <div className="flex min-h-screen min-w-screen bg-sky-400">
      <div className="flex bg-white m-20 w-screen rounded-2xl">
        <div className="flex flex-col w-full h-full rounded-2xl">
          <Header />
          <CourseListing />
        </div>
      </div>
    </div>
  );
}

export default Courses;
