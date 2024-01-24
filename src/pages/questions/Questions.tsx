import { useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";

function Questions() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="products ">
      <div className="header sticky top-0 ">
        <h1 className="header-txt">Questions</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Question
        </button>
      </div>

      {/* {isLoading ? (
        <Loading />
      ) : exam.length != 0 ? (
        <DataTable slug="exams" columns={columns} rows={exam} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )} */}
      {open && <AddQuestion />}
    </div>
  );
}

export default Questions;
