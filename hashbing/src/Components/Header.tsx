import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import SearchBar from "./SearchBar";

function Header(props: { selection: string }) {
  const dispatch = useDispatch();
  const userDetail = useSelector((state: RootStateOrAny) => state.users);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userDetail) {
      console.log("logout");
      auth.signOut();
      navigate("/login");
    }
  };
  return (
    <div className="flex w-full shadow-2xl">
      <div className="flex w-1/2 justify-start">
        <div className="flex m-4">
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="m-1">
              <FontAwesomeIcon
                icon={faUserCircle}
                size={"2x"}
                color={"grey"}
                className="cursor-pointer relative"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 "
            >
              <li>
                <Link className="hover:bg-sky-400 hover:text-black" to="/">
                  Courses
                </Link>
              </li>
              <li>
                <Link className="hover:bg-sky-400 hover:text-black" to="/users">
                  {userDetail?.user?.displayName}
                </Link>
              </li>
              <li>
                <div className="hover:bg-sky-400" onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 justify-end">
        <Link to="/">
          {props.selection == "courses" ? (
            <div
              id="courses"
              className="text-md font-bold text-blue-400 p-5 cursor-pointer"
            >
              Courses
            </div>
          ) : (
            <div id="courses" className="text-md font-bold p-5 cursor-pointer">
              Courses
            </div>
          )}
        </Link>
        <Link to="/enrolled">
          {props.selection == "enrolled" ? (
            <div
              id="enrolled"
              className="text-md font-bold text-blue-400 p-5 cursor-pointer"
            >
              Enrolled
            </div>
          ) : (
            <div id="enrolled" className="text-md font-bold p-5 cursor-pointer">
              Enrolled
            </div>
          )}
        </Link>
        <Link to="/authored">
          {props.selection == "authored" ? (
            <div
              id="authored"
              className="text-md font-bold text-blue-400 p-5 cursor-pointer"
            >
              Authored
            </div>
          ) : (
            <div id="authored" className="text-md font-bold p-5 cursor-pointer">
              Authored
            </div>
          )}
        </Link>
        <Link to="/users">
          {props.selection == "users" ? (
            <div
              id="users"
              className="text-md font-bold text-blue-400 p-5 cursor-pointer"
            >
              {userDetail.user.displayName}
            </div>
          ) : (
            <div id="users" className="text-md font-bold p-5 cursor-pointer">
              {userDetail.user.displayName}
            </div>
          )}
        </Link>
        <div
          className="text-md font-bold p-5 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;
