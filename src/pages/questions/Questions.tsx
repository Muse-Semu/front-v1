import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { boxAction } from "../../redux/boxSlice";
import QuestionForm from "./QuestionForm";
import {
  fetchQuestionCategory,
  getQuestionCategorySatus,
  selectAllQuestionCategorys,
} from "../../redux/questionCategorySlice";
import {
  fetchQuestions,
  getQuestionSatus,
  selectAllQuestions,
} from "../../redux/questionSlice";
import { MdAdd, MdAddBox, MdArrowBack, MdDelete, MdEdit } from "react-icons/md";
import UpdateQUestion from "./UpdateQUestion";

function Questions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const questionCategory = useSelector(selectAllQuestionCategorys);
  const questionCategoryStatus = useSelector(getQuestionCategorySatus);
  const questions = useSelector(selectAllQuestions);
  const questionStatus = useSelector(getQuestionSatus);
  const [singleQuestion, setSingleQuestion] = useState();
  useEffect(() => {
    if (questionCategoryStatus === "idle") {
      dispatch(fetchQuestionCategory());
    }
  }, [questionCategoryStatus, dispatch]);

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionStatus, dispatch]);
  return (
    <div className="products grid gap-3">
      <div className="header sticky top-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="header-txt">Questions</h1>
          <button
            className="px-3 py-2 cursor-pointer rounded-md border"
            onClick={() => setOpen(true)}
          >
            <MdAdd size={20} />
          </button>
        </div>
        <div>
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="grid gap-2">
        {questions &&
          questions
            .filter((ques: any) => ques.exam.id == id)
            .map((question: any) => (
              <div key={question.id} className="box-c">
                <div>
                  <h1>{question.content}</h1>
                  {question.options &&
                    question.options.map((option: any) => (
                      <div key={option} className="flex gap-3 px-3">
                        <input type="radio" name="" id="" radioGroup="option" />
                        <label htmlFor="">{option}</label>
                      </div>
                    ))}
                  <div className="py-2 grid gap-1 ">
                    <div className="">
                      <label htmlFor="" className="form-label">
                        Answer
                      </label>
                      <p className="font-bold ">
                        Option{question.answerIndex}{" "}
                        {question.options[question.answerIndex - 1]}{" "}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="" className="form-label">
                        Explanation
                      </label>
                      <p>{question.explanation}</p>
                    </div>
                  </div>

                  <div className="label-with-input ">
                    <label htmlFor="" className="form-label ">
                      Actions
                    </label>
                    <div className=" flex font-bold gap-2 text-2xl">
                      <button
                        className=" runded p-2 submit-btn "
                        onClick={() => {
                          setIsEdit(true);
                          setSingleQuestion(question);
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button className=" runded p-2  remove-btn">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      {open && (
        <QuestionForm
          questionCategory={questionCategory}
          open={open}
          setOpen={setOpen}
        />
      )}
      {isEdit && (
        <UpdateQUestion
          questionCategory={questionCategory}
          setIsEdit={setIsEdit}
          singleQuestion={singleQuestion}
        />
      )}
    </div>
  );
}

export default Questions;
