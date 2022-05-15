import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createCourseActionResetError } from "../actions/types/courses/Courses.actions";
import Button from "../Components/Button";

type Props = {};

function CourseCreationError ({}: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(createCourseActionResetError());
    };
  }, []);

  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <p className='flex flex-col items-center justify-center'>
          OOPS an error occured while creating the course. Please try again
          later
        </p>
        <Link to='/'>
          <Button name='Navigate to home page'></Button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default CourseCreationError;
