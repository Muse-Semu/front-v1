import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { slugs } from "../../constant";
import { columns } from "./columns";
import store from "../../redux/Store";
import { fetchExamCategory } from "../../redux/examCategorySlice";

function ExamCategory() {
  const [open, setOpen] = useState(false);
  const examCategory = store.getState().examCategory.examCategorys;
  const isLoading = store.getState().examCategory.isLoading;
  const diapatch = useDispatch();
  const box = store.getState().box.isOpen;

  useEffect(() => {
    diapatch(fetchExamCategory());
  }, []);

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

      {isLoading ? (
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
