import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, getSubjectSatus, selectAllSubjects } from "../../redux/subjectSlice";
import { useEffect, useState } from "react";

const SubjectList = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);
  const subjectStatus = useSelector(getSubjectSatus);

  useEffect(() => {
    if (subjectStatus === "idle") {
      dispatch(fetchSubjects());
    }
  }, [subjectStatus, dispatch]);
  return (
    <div className="  shadow-gray-700 shadow-lg p-4">
      <div className="mb-4">
        <div className=" bg-inherit">
          <h1 className="rounded-t-md py-2 border-b border-gray-700 font-extrabold text-2xl">
            Subjects
          </h1>
          
        </div>
      </div>

    </div>
  );
};

export default SubjectList;
