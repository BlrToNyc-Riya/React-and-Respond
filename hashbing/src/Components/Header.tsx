import React from "react";

function Header() {
  return (
    <div className="flex w-full shadow-2xl shadow-black">
      <div className="flex w-1/2 justify-start"></div>
      <div className="flex w-1/2 justify-end">
        <div className="text-md font-bold p-5 text-blue-400 cursor-pointer">
          Courses
        </div>
        <div className="text-md font-bold p-5 cursor-pointer">Enrolled</div>
        <div className="text-md font-bold p-5 cursor-pointer">User</div>
        <div className="text-md font-bold p-5 cursor-pointer">Logout</div>
      </div>
    </div>
  );
}

export default Header;
