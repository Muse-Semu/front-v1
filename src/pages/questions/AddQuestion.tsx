import React, { useState } from "react";
import { MdClose, MdImage } from "react-icons/md";
import { questionFormFields } from "./columns";
import { useDispatch } from "react-redux";
import { boxAction } from "../../redux/boxSlice";

const AddQuestion = (props) => {
  const diapatch = useDispatch();
  const [questionImage, setQuestionImage] = useState(null);
  const [answerImage, setAnswerImage] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    options: Array(4).fill(""),
    answerIndex: 1,
    explanation: "",
    exam: null,
    questionCategory: null,
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  const handleImageChange = (e, name) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (name === "question") {
        setQuestionImage(reader.result);
      } else {
        setAnswerImage(reader.result);
      }
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className=" modal-wrapper">
      <div className="modal-box modal w-[800px] h-[500px] relative rounded-lg ">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4  border-inherit">
          <span
            className="close absolute top-4 right-2 cursor-pointer"
            onClick={() => diapatch(boxAction.showBox())}
          >
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">Add New Question</h1>
        </div>
        <form className="form-container" action="">
          <div className="label-with-input col-span-2">
            {" "}
            <label htmlFor="" className="form-label">
              Content
            </label>
            <input className="form-input h-[70px]  " type="text" name="" id="" />
          </div>
          {questionFormFields
            .filter(
              (item) =>
                item.type === "text-area" &&
                item.field !== "content" &&
                item.field !== "explanation"
            )
            .map((field) => (
              <div key={field.id} className="label-with-input">
                <label className="form-label" htmlFor="">
                  {field.label}
                </label>
                <textarea
                  className="form-input"
                  name=""
                  id=""
                  rows="2"
                ></textarea>
              </div>
            ))}

          <div className="label-with-input">
            <label htmlFor="" className="form-label">
              Question Image
            </label>
            {questionImage ? (
              <div className="grid  p-2 gap-2 ">
                <img
                  src={questionImage}
                  alt=""
                  className=" max-h-[400px] w-full rounded-md object-cover"
                />
                <div>
                  <button
                    onClick={() => setQuestionImage(null)}
                    className="rounded-md p-2 text-center cursor-pointer bg-red-500 w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                {" "}
                <label className=" p-3 cursor-pointer  flex items-center justify-center border">
                  <div className="rounded-md flex flex-col gap-1 p-2 w-full items-center justify-center border-dashed border ">
                    <h1>upload image</h1> <MdImage size={25} />
                  </div>
                  <input
                    type="file"
                    id=""
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "question")}
                  />
                </label>
              </>
            )}
          </div>

          <div className="label-with-input">
            <label htmlFor="" className="form-label">
              Answer Image
            </label>
            {answerImage ? (
              <div className="grid  p-2 gap-2 ">
                <img
                  src={answerImage}
                  alt=""
                  className=" max-h-[400px] w-full rounded-md object-cover"
                />
                <div>
                  <button
                    onClick={() => setAnswerImage(null)}
                    className="rounded-md p-2 text-center cursor-pointer bg-red-500 w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                {" "}
                <label className=" p-3 cursor-pointer  flex items-center justify-center border">
                  <div className="rounded-md flex flex-col gap-1 p-2 w-full items-center justify-center border-dashed border ">
                    <h1>upload image</h1> <MdImage size={25} />
                  </div>
                  <input
                    type="file"
                    id=""
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "answer")}
                  />
                </label>
              </>
            )}
          </div>

          <div className="label-with-input col-span-2">
            {" "}
            <label htmlFor="" className="form-label">
              Explanation
            </label>
            <textarea className="form-input" name="" id="" rows="5"></textarea>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 lg:col-span-2 my-5 font-extrabold">
            <button
              className="submit-btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </button>
            <span className="rounded-md p-2 text-center cursor-pointer bg-red-500 ">
              Clear
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

