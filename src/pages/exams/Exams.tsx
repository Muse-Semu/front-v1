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
import { selectAllExamCategorys } from "../../redux/examCategorySlice";
import { selectAllSubjects } from "../../redux/subjectSlice";
import { Md1KPlus, MdArrowBack, MdExposurePlus1 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CircleFadingPlus } from "lucide-react";
import AddExam from "./AddExam";
// import type { RootState, AppDispatch } from "../../redux/Store";

function Exams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="relative">
      <div className="header  ">
        <div className="flex items-center gap-2 ">
          <h1 className="header-txt">Exams</h1>
          <button className="normal-btn flex gap-2" onClick={() => setOpen(true)}>
             <CircleFadingPlus/> 
             <span>New</span>
          </button>
        </div>
        <div className="cursor-pointer">
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>

      {examStatus === "pending" ? (
        <Loading />
      ) : exam.length != 0 ? (
        <DataTable slug="exams" columns={columns} rows={exam} />
      ) : (
        <div className="fixed border flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && (
        <AddExam
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
