import { GridColDef } from "@mui/x-data-grid";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";
import { updateExamCategory } from "../../api/examCategoryApi";
import store from "../../redux/Store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useExamCategoryStore from "@/redux/examCategorySlice";

type Props = {
  id: number;
  title: string;
  slug: string;
  columns: GridColDef[];
  editbaleExamCategory: {
    id: number;
    title: string;
    description: string;
  };
  setEditBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateExamCategory = (props: Props) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  const handleClear = () => {
    console.log("Data cleared!");
  };

  const [examCategoryFormData, setExamCategoryFormData] = useState({
    title: props.editbaleExamCategory.title,
    description: props.editbaleExamCategory.description,
  });

  const {examCategorys,fetchExamCategory}= useExamCategoryStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await updateExamCategory(props.id, formData).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully updated")
        setTimeout(() => {
          props.setEditBox(false);
         
        }, 1000);

       fetchExamCategory;
      }
    });
  };

  const handleInputChange = (fieldName: string, newValue: string) => {
    setExamCategoryFormData((prevData) => ({
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
                item.field !== "active"
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
                  value={examCategoryFormData[column.field]}
                  onChange={(event) =>
                    handleInputChange(column.field, event.target.value)
                  }
                />
              </div>
            ))}

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
    </div>
  );
};

export default UpdateExamCategory;
