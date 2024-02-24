import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { slugs } from "../../constant";
import { columns } from "./columns";
import store from "../../redux/Store";
import {
  fetchExamCategory,
  getExamCategorySatus,
  selectAllExamCategorys,
} from "../../redux/examCategorySlice";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CircleFadingPlus } from "lucide-react";

function ExamCategory() {
  const [open, setOpen] = useState(false);
  const examCategory = useSelector(selectAllExamCategorys);
  const examCategoryStatus = useSelector(getExamCategorySatus);
  const dispatch = useDispatch();
  const box = store.getState().box.isOpen;
  const navigate = useNavigate()
  useEffect(() => {
    if (examCategoryStatus === "idle") {
      dispatch(fetchExamCategory());
    }
  }, [examCategoryStatus, dispatch,examCategory]);

  return (
    <div className="products ">
      <div className="header  ">
        <div className="flex items-center gap-2">
          <h1 className="header-txt">Exam Category</h1>
         <button className="normal-btn flex gap-2" onClick={() => setOpen(true)}>
             <CircleFadingPlus/> 
             <span>New</span>
          </button>
        </div>
        <div className="cursor-pointer">
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>

      {examCategoryStatus === "pending" ? (
        <Loading />
      ) : examCategory.length != 0 ? (
        <DataTable
          slug={slugs.EXAM_CATEGORY}
          columns={columns}
          rows={examCategory}
        />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && (
        <Add
          slug={slugs.EXAM_CATEGORY}
          examCategory={[]}
          subject={[]}
          columns={columns}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default ExamCategory;
