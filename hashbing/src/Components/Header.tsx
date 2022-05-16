import {
  faBars,
  faHamburger,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import webLogo from "../Images/webLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, createToken } from "../firebase";
import SearchBar from "./SearchBar";
import axios from "axios";

type userDetail = {
  _id: string;
  email: string;
  coursesEnrolled: [string];
  courseAuthored: [string];
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  profilePic: string;
};
function Header (props: { selection: string }) {
  const dispatch = useDispatch();
  const userDetail = useSelector((state: RootStateOrAny) => state.users);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [user, setUser] = useState<userDetail>();
  const [rerender, setRerender] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const header = await createToken();
      const url = `http://localhost:4000/users/profile`;
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
          const userDetails = await response.json();
          console.log(userDetails);
          setUser(userDetails);
        })
        .catch(error => console.log(error.message));
    };
    fetchUser();
    return () => {
      fetchUser;
    };
  }, []);

  const handleLogout = async () => {
    if (userDetail) {
      console.log("logout");
      auth.signOut();
      const url = `http://localhost:4000/users/logout`;

      const header = await createToken();
      axios
        .post(url, header)
        .then(response => {
          console.log("Logged out Successfully!");
          navigate("/login");
        })
        .catch(error => console.log(error.message));
    }
  };
  return (
    <div className='flex w-full shadow-2xl'>
      <div className='flex w-1/2 items-center justify-start'>
        <div className='flex ml-4'>
          <div className='dropdown dropdown-hover'>
            <FontAwesomeIcon
              icon={faBars}
              size={"2x"}
              color={"black"}
              className='cursor-pointer relative mt-4'
            />
            <ul
              tabIndex={0}
              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 '
            >
              <li>
                <Link
                  className='hover:bg-sky-400 hover:text-black'
                  to='/courses/new'
                >
                  Create Course
                </Link>
              </li>
              <li>
                <Link className='hover:bg-sky-400 hover:text-black' to='/'>
                  Courses
                </Link>
              </li>
              <li>
                <Link className='hover:bg-sky-400 hover:text-black' to='/users'>
                  {userDetail?.user?.displayName}
                </Link>
              </li>
              <li>
                <div className='hover:bg-sky-400' onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex items-center'>
          <img src={webLogo} alt='logo' className='h-12 ml-5' />
          <h1 className='mx-5'>Learn Owl</h1>
        </div>
      </div>
      <div className='flex w-1/2 justify-end'>
        <Link to='/'>
          {pathname === "courses" || pathname === "/" ? (
            <div
              id='courses'
              className='text-md font-bold text-blue-600 p-5 cursor-pointer'
            >
              Courses
            </div>
          ) : (
            <div className='text-md font-bold p-5 cursor-pointer'>Courses</div>
          )}
        </Link>
        <Link to='/enrolled'>
          {pathname.includes("enrolled") ? (
            <div
              id='enrolled'
              className='text-md font-bold text-blue-600 p-5 cursor-pointer'
            >
              Enrolled
            </div>
          ) : (
            <div className='text-md font-bold p-5 cursor-pointer'>Enrolled</div>
          )}
        </Link>
        <Link to='/authored'>
          {pathname.includes("authored") ? (
            <div
              id='authored'
              className='text-md font-bold text-blue-600 p-5 cursor-pointer'
            >
              Authored
            </div>
          ) : (
            <div className='text-md font-bold p-5 cursor-pointer'>Authored</div>
          )}
        </Link>
        <Link to='/courses/new'>
          {pathname.includes("/courses/new") ? (
            <div
              id='authored'
              className='text-md font-bold text-blue-600 p-5 cursor-pointer'
            >
              Create Course
            </div>
          ) : (
            <div className='text-md font-bold p-5 cursor-pointer'>
              Create Course
            </div>
          )}
        </Link>
        <Link to='/users'>
          {pathname.includes("users") ? (
            <div
              id='users'
              className='text-md font-bold text-blue-600 p-5 cursor-pointer'
            >
              {userDetail.user.displayName}
            </div>
          ) : (
            <div className='text-md font-bold p-5 cursor-pointer'>
              {userDetail.user?.displayName}
            </div>
          )}
        </Link>
        <div
          className='text-md font-bold p-5 cursor-pointer'
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;
