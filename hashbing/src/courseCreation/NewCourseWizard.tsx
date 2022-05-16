import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import Header from "../Components/Header";
import Buttons from "../utilComponents/Buttons";
import Button from "../Components/Button";
import {
  createCourseActionResetError,
  createCourseAddActionAction
} from "../actions/types/courses/Courses.actions";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../store";
import { courseCreationStatus } from "../actions/types/CourseAction.types";

type Props = {};

function NewCourseWizard ({}: Props) {
  const [document, updateDocument] = useState("");
  const dispatch = useDispatch();
  const { courses } = useSelector((state: Store) => state);
  const { data } = courses;

  const submitDocument = () => {
    if (document.trim().length === 0)
      return alert("Please enter valid course data");
    dispatch(
      createCourseAddActionAction(
        {
          name: data.name,
          authorId: data.authorId,
          details: data.details,
          tags: data.tags,
          courseOutcome: data.courseOutcome,
          courseContent: document
        },
        courseCreationStatus.COURSE_CREATION_STAGE_3
      )
    );
  };
  return (
    <div className='h-screen'>
      {/* <Header selection='authored' /> */}
      <div className='m-5 flex items-center flex-col '>
        <Button name='Publish Course' onClick={submitDocument} />
        <TextEditor updateDocument={updateDocument} className='mt-10' />
      </div>
    </div>
  );
}

export default NewCourseWizard;
