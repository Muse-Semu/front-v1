import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubjects,
  getSubjectSatus,
  selectAllSubjects,
} from "../../redux/subjectSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Lists from "../common/Lists";

const SubjectList = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);
  const subjectStatus = useSelector(getSubjectSatus);

  useEffect(() => {
    if (subjectStatus === "idle") {
      dispatch(fetchSubjects());
    }
  }, [subjectStatus, dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(refresh, 10000);
  //   return () => clearInterval(interval);
  // }, []);
  
  return (
    <div className="  shadow-gray-700 shadow-lg p-4">
      <div className="mb-4">
        <div className=" bg-inherit">
          <h1 className="rounded-t-md py-2 border-b border-gray-700 font-extrabold text-2xl">
            Subjects
          </h1>
        </div>

        {subjectStatus === "pending" ? (
          <Loading />
        ) : subjects.length != 0 ? (
          <Lists data={subjects} />
        ) : (
          <>Error</>
        )}
      </div>
    </div>
  );
};

export default SubjectList;
