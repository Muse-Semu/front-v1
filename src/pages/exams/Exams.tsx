import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { columns } from "./columns";
import { slugs } from "../../constant";
import {
  fetchExams,
  getExamSatus,
  selectAllExams,
} from "../../redux/examSlice";
import store from "../../redux/Store";
import {
  selectAllExamCategorys,
} from "../../redux/examCategorySlice";
import { selectAllSubjects } from "../../redux/subjectSlice";

function Exams() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const box = store.getState().box.isOpen;
  const examStatus = useSelector(getExamSatus);
  const exam = useSelector(selectAllExams);
  const subject = useSelector(selectAllSubjects);
  const examCategory = useSelector(selectAllExamCategorys);

  useEffect(() => {
    if (examStatus === "idle") {
      dispatch(fetchExams());
    }
  }, [examStatus, dispatch]);
  
  return (
    <div className="products ">
      <div className="header sticky top-0 ">
        <h1 className="header-txt">Exams</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Exam
        </button>
      </div>

      {examStatus === "pending" ? (
        <Loading />
      ) : exam.length != 0 ? (
        <DataTable slug="exams" columns={columns} rows={exam} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && (
        <Add
          slug={slugs.EXAM}
          subject={subject}
          examCategory={examCategory}
          columns={columns}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Exams;
