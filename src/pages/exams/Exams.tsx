import {  useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { columns, otherfields } from "./columns";
import { slugs } from "../../constant";

function Exams() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const subject = useSelector((state)=>state.exam.subject)
  const exam = useSelector((state) =>state.exam.exams)
  const examCategory = useSelector((state)=>state.exam.exam_category)

  const box = useSelector((state) => state.box.isOpen);
  console.log(box);
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

     

      {isLoading ? (
        <Loading />
      ) :exam.length != 0 ? (
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
          otherFields = {otherfields}
          
          setOpen={setOpen}
        />
      )}
    </div>
  );
}



export default Exams;
