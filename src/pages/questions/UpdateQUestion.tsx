import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateQuestion } from "../../api/APIService";
import { toast } from "react-toastify";
import { questionFormFields } from "./columns";
import { MdClose } from "react-icons/md";
import { fetchQuestions } from "../../redux/questionSlice";

function UpdateQUestion(props) {
  // console.log("Editable Question", props.singleQuestion);
  const questionData = props.singleQuestion;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: questionData.content,
    option1: questionData.options[0],
    option2: questionData.options[1],
    option3: questionData.options[2],
    option4: questionData.options[3],
    explanation: questionData.explanation,
    exam: { id: id },
  });

  const [answerIndex, setAnswerIndex] = useState(questionData.answerIndex);
  const [questionCategory, setQuestionCategory] = useState(
    questionData.questionCategory.id
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string | File | Number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleAnswerChange = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: string[] = [
      "option1",
      "option2",
      "option3",
      "option4",
      "content",
      "explanation",
    ];
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    requiredFields.forEach((field: string) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const toBeSent = {
      ...formData,
      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4,
      ],
      answerIndex: answerIndex,
      questionCategory: { id: questionCategory },
    };
    console.log("TO be sent data : ", toBeSent);

    await updateQuestion(questionData.id, toBeSent).then((res) => {
      if (res.status == 200) {
        setTimeout(() => {
          props.setIsEdit(false);
          toast.success("Successfully updated", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
        dispatch(fetchQuestions());
      }
    });
  };

  return (
    <div className=" modal-wrapper">
      <div className="modal-box modal w-[800px] h-[500px] relative rounded-lg ">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4  border-inherit">
          <span
            className="close absolute top-4 right-2 cursor-pointer"
            onClick={() => props.setIsEdit(false)}
          >
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">Add New Question </h1>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          {questionFormFields.map((field) => (
            <div
              key={field.field}
              className={`label-with-input ${
                field.field === "content" || field.field === "explanation"
                  ? "lg:col-span-2"
                  : "col-span-1"
              } `}
            >
              <label className="form-label">{field.label}</label>

              <textarea
                className="col-span-2 form-input"
                value={formData[field.field]}
                onChange={(e) => handleChange(field.field, e.target.value)}
                rows={3}
              />

              {errors[field.field] && (
                <p style={{ color: "red" }}>{errors[field.field]}</p>
              )}
            </div>
          ))}

          <div className="label-with-input">
            <label htmlFor="" className="form-label">
              Answer
            </label>
            <select
              className="form-select"
              name=""
              id=""
              value={answerIndex}
              onChange={(e) => setAnswerIndex(e.target.value)}
            >
              {questionFormFields
                .filter((field) => field.group === "option")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="label-with-input">
            <label htmlFor="" className="form-label">
              QuestionCategory
            </label>
            <select
              className="form-select"
              name=""
              id=""
              value={questionCategory}
              onChange={(e) => setQuestionCategory(e.target.value)}
            >
              {props.questionCategory.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-btn-div">
            <button type="submit" className="submit-btn">
              Update
            </button>
            <div className="remove-btn">Cancel</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateQUestion;
