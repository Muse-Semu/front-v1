import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { columns } from "./columns";
import { slugs } from "../../constant";

import store from "../../redux/Store";

import { Md1KPlus, MdArrowBack, MdExposurePlus1 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CircleFadingPlus } from "lucide-react";
import AddExam from "./AddExam";
import useExamStore, { ExamState } from "@/redux/examSlice";
import useExamCategoryStore from "@/redux/examCategorySlice";
import { useSubjectStore } from "@/redux/subjectSlice";
// import type { RootState, AppDispatch } from "../../redux/Store";

function Exams() {
  const navigate = useNavigate();
  const { exams, status, questions, fetchExams }: ExamState = useExamStore();

  const [open, setOpen] = useState(false);

  const {examCategorys} = useExamCategoryStore()
  const {subjects} = useSubjectStore() 
  useEffect(() => {
    if(status==='idle'){
       fetchExams();
    }
  }, [status]);

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

      {status === "pending" ? (
        <Loading />
      ) : exams.length != 0 ? (
        <DataTable slug="exams" columns={columns} rows={exams} />
      ) : (
        <div className="fixed border flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && (
        <AddExam
          slug={slugs.EXAM}
          subject={subjects}
          examCategory={examCategorys}
          columns={columns}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Exams;
