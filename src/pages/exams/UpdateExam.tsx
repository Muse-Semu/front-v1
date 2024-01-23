import { GridColDef } from "@mui/x-data-grid";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import { updateExam } from "../../api/APIService";
import MessageBox from "../../components/messages/MessageBox";
import store from "../../redux/Store";
import { useDispatch } from "react-redux";
import { boxAction } from "../../redux/boxSlice";

type Props = {
  id: number;
  title: string;
  slug: string;
  columns: GridColDef[];
  editableExam: any;
  setEditBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateExam = (props: Props) => {
  const dispatch = useDispatch();
  const [examCategoryId, setExamCategoryId] = useState(
    props.editableExam.examCategory.id
  );
  const [subjectId, setSubjectId] = useState(props.editableExam.subject.id);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  const box = store.getState().box.isOpen;
  const subject = store.getState().exam.subject;
  const examCategory = store.getState().exam.exam_category;
  const handleClear = () => {
    console.log("Data cleared!");
  };

  const [examFormData, setExamFormData] = useState({
    ...props.editableExam,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
     const readyToUpload = {
       ...Object.fromEntries(formData),
       subject: { id: subjectId },
       examCategory: { id: examCategoryId },
      
     };
    await updateExam(props.id,JSON.stringify(readyToUpload)).then((res) => {
      if (res.status === 200) {
        dispatch(boxAction.showBox(box));
        setMessage({ msg: "Successfully updated", type: "success" });
      }
    });
  };

  const handleInputChange = (fieldName, newValue) => {
    setExamFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };


  return (
    <div className=" modal-wrapper">
      <div className="modal-box modal w-[800px] h-[500px] relative rounded-lg ">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4  border-inherit">
          <span
            className="close absolute top-4 right-2 cursor-pointer"
            onClick={() => props.setEditBox(false)}
          >
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">EDIT {props.title}</h1>
        </div>

        <form
          className=" grid lg:grid-cols-2 gap-4 p-4"
          onSubmit={handleSubmit}
        >
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "createdAt" &&
                item.field !== "active" &&
                item.field !== "title" &&
                item.field !== "examCategory" &&
                item.field !== "subject"
            )
            .map((column) => (
              <div
                key={column.field}
                className="w-full flex flex-col gap-2 mb-5 "
              >
                <label className="form-label">{column.headerName}</label>
                <input
                  className="form-input"
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                  value={examFormData[column.field]}
                  onChange={(event) =>
                    handleInputChange(column.field, event.target.value)
                  }
                />
              </div>
            ))}

          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="form-label">
              Exam Category
            </label>
            <select
              name=""
              id=""
              className="form-select"
              value={examCategoryId}
              required
              onChange={(e) => {
                setExamCategoryId(e.target.value);
              }}
            >
              {examCategory.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="form-label">
              Subject
            </label>
            <select
              name=""
              id=""
              className="form-select"
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
              required
            >
              {subject.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 lg:col-span-2 my-5 font-extrabold">
            <button className="submit-btn" type="submit">
              Update
            </button>
            <span
              className="rounded-md p-2 text-center cursor-pointer bg-red-500 "
              onClick={handleClear}
            >
              Clear
            </span>
          </div>
        </form>
      </div>
      {box && <MessageBox message={message} />}
    </div>
  );
};

export default UpdateExam;
