import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { MdClose, MdImage } from "react-icons/md";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boxAction } from "../../redux/boxSlice";
import MessageBox from "../messages/MessageBox";
import { addCategory, addExam, addSubject } from "../../api/APIService";

type Props = {
  slug: string;
  columns: GridColDef[];
  subject: any[];
  examCategory: any[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const box = useSelector((state) => state.box.isOpen);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const [subject, setSubject] = useState(1);
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const [image, setImage] = useState(null);

  const handleUploadChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    console.log(imageFile);
    
    reader.onload = () => {
      setImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };
  const handleClear = () => {
    console.log("Data cleared!");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const handleApiCall = async (
      apiFunction: any,
      slug: string,
      additionalData: {}
    ) => {
      console.log(slug);

      try {
        const response = await apiFunction(
          slug === "exam" ? JSON.stringify(additionalData) : formData
        );
        props.setOpen(false);
        setMessage({ type: "success", msg: `${slug} Added successfully` });
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.error || error.response || "Connection refused";
        setMessage({ type: "error", msg: errorMsg });
      } finally {
        dispatch(boxAction.showBox(box));
      }
    };

    switch (props.slug.toLowerCase()) {
      case "subject":
        handleApiCall(addSubject, "subject", {});
        break;
      case "exam_category":
        handleApiCall(addCategory, "exam_category", {});
        break;
      case "exam":
        const readyToUpload = {
          ...Object.fromEntries(formData),
          subject: { id: subject },
          examCategory: { id: selected },
        };
        handleApiCall(addExam, "exam", readyToUpload);
        break;
      case "user":
        console.log("This user is gonna to adrqk,k1");

        // addUSer("")
        break;
      default:
        break;
    }
    // addExam(formData)
  };

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(e.target.value);
  //   console.log(selected);
  // };

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
          <h1 className=" text-2xl font-extrabold">
            Add New {props.slug.toLocaleUpperCase()}
          </h1>
        </div>

        <form
          className=" grid lg:grid-cols-2 gap-4 p-4"
          onSubmit={handleSubmit}
        >
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "examCategory" &&
                item.field !== "subject" &&
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
                  required={
                    column.field === "title" && props.slug === "exam"
                      ? false
                      : true
                  }
                />
              </div>
            ))}

          {props.slug.toLowerCase() === "exam" && (
            <>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="form-label">
                  Exam Category
                </label>
                <select
                  name=""
                  id=""
                  className="form-input"
                  value={selected}
                  required
                  onChange={(e) => {
                    setSelected(e.target.value);
                  }}
                >
                  {props.examCategory &&
                    props.examCategory.map((option) => (
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
                  className="form-input bg-gray-500"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  required
                >
                  {props.subject &&
                    props.subject.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" grid gap-2 ">
                <p className="form-label">Image</p>
                <div className="form-input">
                {image ? (
                  <div className="grid  p-2 gap-2 ">
                    <img src={image} alt="" className=" max-h-[400px] w-full rounded-md object-cover" />
                    <div>
                      <button
                        onClick={() => setImage(null)}
                        className="rounded-md p-2 text-center cursor-pointer bg-red-500 w-full"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <label className=" p-3 cursor-pointer  flex items-center justify-center">
                      <div className="rounded-md flex flex-col gap-1 p-2 w-full items-center justify-center border-dashed border ">
                        <h1>upload image</h1> <MdImage size={50} />
                      </div>
                      <input
                        type="file"
                        id=""
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadChange}
                      />
                    </label>
                  </>
                )}
                </div>
              </div>
            </>
          )}

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
      {box && <MessageBox message={message} />}
    </div>
  );
};

export default Add;
