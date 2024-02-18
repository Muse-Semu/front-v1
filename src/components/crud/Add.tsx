import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { MdClose, MdImage } from "react-icons/md";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boxAction } from "../../redux/boxSlice";
import MessageBox from "../messages/MessageBox";
import { addExamCategory, addExam, addSubject } from "../../api/APIService";
import axios from "axios";
import { slugs } from "../../constant";

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
  const [imageUploading, setImageUploading] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    setImageUploading(imageFile);
  };

  const handleClear = () => {
    console.log("Data cleared!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));

    if (imageUploading) {
      formData.append("file", imageUploading);
      await axios
        .post("http://localhost:8082/api/uploads", formData)
        .then((res) => {
          setImageUrl(res.data.url);
        })
        .catch((e) => console.log(e.message));
    }

    const handleApiCall = async (
      apiFunction: any,
      slug: string,
      additionalData: {}
    ) => {
      try {
        const response = await apiFunction(
          slug === slugs.EXAM ? JSON.stringify(additionalData) : formData
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

    switch (props.slug) {
      case slugs.SUBJECT:
        handleApiCall(addSubject, "subject", {});
        break;
      case slugs.EXAM_CATEGORY:
        handleApiCall(addExamCategory, "exam_category", {});
        break;
      case slugs.EXAM:
        console.log("This is image " + imageUrl);

        const readyToUpload = {
          ...Object.fromEntries(formData),
          subject: { id: subject },
          examCategory: { id: selected },
          image_url: imageUrl,
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

        <form className=" form-container " onSubmit={handleSubmit}>
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
              <div key={column.field} className=" label-with-input ">
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

          {props.slug === slugs.EXAM && (
            <>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="form-label">
                  Exam Category
                </label>
                <select
                  name=""
                  id=""
                  className="form-select"
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
                  className="form-select"
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
                      <img
                        src={image}
                        alt=""
                        className=" max-h-[400px] w-full rounded-md object-cover"
                      />
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

          <div className="form-btn-div">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <div  className="remove-btn">
              Clear
            </div>
          </div>
        </form>
      </div>
      {box && <MessageBox message={message} />}
    </div>
  );
};

export default Add;
