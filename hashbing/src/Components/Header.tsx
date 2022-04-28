import React from "react";
import { Link } from "react-router-dom";
interface items {
  section: string;
}
function Header() {
  // if (props.section === "courses") {
  //   const courses = document.getElementById("courses");
  // } else if (props.details === "enrolled") {
  //   const enrolled = document.getElementById("enrolled");
  // } else if (props.details === "user") {
  //   const user = document.getElementById("user");
  // }
  return (
    <div className="flex w-full shadow-2xl">
      <div className="flex w-1/2 justify-start"></div>
      <div className="flex w-1/2 justify-end">
        <Link to="/">
          <div
            id="courses"
            className="text-md font-bold p-5 text-blue-400 cursor-pointer"
          >
            Courses
          </div>
        </Link>
        <Link to="/enrolled">
          <div id="enrolled" className="text-md font-bold p-5 cursor-pointer">
            Enrolled
          </div>
        </Link>
        <div id="user" className="text-md font-bold p-5 cursor-pointer">
          User
        </div>
        <div className="text-md font-bold p-5 cursor-pointer">Logout</div>
      </div>
    </div>
  );
}

export default Header;
