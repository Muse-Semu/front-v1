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

function ExamCategory() {
  const [open, setOpen] = useState(false);
  const examCategory = useSelector(selectAllExamCategorys);
  const examCategoryStatus = useSelector(getExamCategorySatus);
  const dispatch = useDispatch();
  const box = store.getState().box.isOpen;

  useEffect(() => {
    if (examCategoryStatus === "idle") {
      dispatch(fetchExamCategory());
    }
  }, [examCategoryStatus, dispatch]);

  return (
    <div className="products ">
      <div className="header font-extrabold ">
        <h1 className="header-txt">Exam Category</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Exam Category
        </button>
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
