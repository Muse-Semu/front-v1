import { GridColDef } from "@mui/x-data-grid";
import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { addExam, updateExam } from "../../api/examsApi";
import store from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useSubjectStore } from "@/redux/subjectSlice";
import useExamStore from "@/redux/examSlice";
import useExamCategoryStore from "@/redux/examCategorySlice";

type Props = {
  id: any;
  title: string;
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Exam = {
  description: string;
  givenTime: number;
  examYear: number;
  subject: {
    id: number;
  };
  examCategory: {
    id: number;
  };
};

const AddExam = (props: Props) => {

  const { exams, status, error, fetchExams } = useExamStore();

  const [examCategoryId, setExamCategoryId] = useState(1);
  const [subjectId, setSubjectId] = useState(1);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
   
  const {examCategorys,fetchExamCategory} = useExamCategoryStore()
  const { subjects, fetchSubjects } = useSubjectStore();

  const handleClear = () => {
    console.log("Data cleared!");
  };

  const [examFormData, setExamFormData] = useState({
    description: "",
    givenTime: null,
    examYear: null,
  });

  // const subjectStatus = useSelector(getSubjectSatus);

  // useEffect(() => {
  //   // Fetch subjects when the component mounts
  //   fetchSubjects();
  // }, [fetchSubjects]);

  // useEffect(() => {
  //   if (subjectStatus === "idle") {
  //     dispatch(fetchSubjects());
  //   }
  // }, [subjectStatus, dispatch]);

  // useEffect(() => {
  //    fetchExamCategory
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
    const readyToUpload = {
      ...Object.fromEntries(formData),
      subject: { id: subjectId },
      examCategory: { id: examCategoryId },
    };

    await addExam(readyToUpload).then((res) => {
      if (res.status === 200) {
        toast.success("Exam added Successfully \n", res.data.title);
        props.setOpen(false);
       fetchExams()
      } else {
        toast.error(res.data.error ? res.data.error : "Unexpected error");
      }
    });
  };

  const handleInputChange = (fieldName: string, newValue: string) => {
    setExamFormData((prevData: any) => ({
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
            onClick={() => props.setOpen(false)}
          >
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">Add New Exam</h1>
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
                  required
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
              {examCategorys &&
                examCategorys.map((option: any) => (
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
              {subjects &&
                subjects.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 lg:col-span-2 my-5 font-extrabold">
            <button className="submit-btn" type="submit">
              Add
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
    </div>
  );
};

export default AddExam;
