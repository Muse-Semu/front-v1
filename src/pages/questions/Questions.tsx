import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import store from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { boxAction } from "../../redux/boxSlice";
import QuestionForm from "./QuestionForm";
import { fetchQuestionCategory, getQuestionCategorySatus, selectAllQuestionCategorys } from "../../redux/questionCategorySlice";

function Questions() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const open = store.getState().box.isOpen;
  const [isLoading, setIsLoading] = useState(false);
  const questionCategory = useSelector(selectAllQuestionCategorys)
  const questionStatus = useSelector(getQuestionCategorySatus)
  useEffect(()=>{
    if(questionStatus === 'idle'){
      dispatch(fetchQuestionCategory());
    }
  },[questionStatus,dispatch])
  return (
    <div className="products ">
      <div className="header sticky top-0 ">
        <h1 className="header-txt">Questions</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => dispatch(boxAction.showBox(open))}
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
      {open && <QuestionForm questionCategory = {questionCategory}/>}
    </div>
  );
}

export default Questions;
