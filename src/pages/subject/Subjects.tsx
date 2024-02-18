import { Reducer, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { GridColDef } from "@mui/x-data-grid";
import { getSubjectById } from "../../api/APIService";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { slugs } from "../../constant";
import { columns } from "./columns";
import {
  fetchSubjects,
  getSubjectSatus,
  selectAllSubjects,
} from "../../redux/subjectSlice";
import store from "../../redux/Store";

function Subjects() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const subject = useSelector(selectAllSubjects);
  const subjectStatus = useSelector(getSubjectSatus);

  useEffect(() => {
    if (subjectStatus === "idle") {
      dispatch(fetchSubjects());
    }
  }, [subjectStatus, dispatch]);

  const box = useSelector((state: any) => state.box.isOpen);

  return (
    <div className="products ">
      <div className="header">
        <h1 className="header-txt">Subject</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Subject
        </button>
      </div>

      {subjectStatus === "pending" ? (
        <Loading />
      ) : subject.length != 0 ? (
        <DataTable slug={slugs.SUBJECT} columns={columns} rows={subject} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && <Add slug={slugs.SUBJECT} columns={columns} setOpen={setOpen} />}
    </div>
  );
}

export default Subjects;
