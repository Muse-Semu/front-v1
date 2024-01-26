import { MdClose, MdImage } from "react-icons/md";
import { questionFormFields } from "./columns";
import { boxAction } from "../../redux/boxSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Group } from "three/src/Three.js";
import { useParams } from "react-router-dom";
interface QuestionFormProps {}

const QuestionForm: React.FC<QuestionFormProps> = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: "",
    questionImage: null,
    answerImage: null,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    explanation: "",
    exam: {id:id},
    questionCategory: {},
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string | File) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleImageChange = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: file,
          [`${field}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: null,
        [`${field}Preview`]: null,
      }));
    }
  };

  const handleRemoveImage = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: null,
      [`${field}Preview`]: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["content", "option1"];
    const newErrors: { [key: string]: string } = {};

    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    readyToUpload = {}
    // Add your form submission logic here
    console.log("Form submitted with data:", formData);

    const form = new FormData(e.currentTarget);
    //  console.log(Object.fromEntries(form));
  };

  return (
    <div className=" modal-wrapper">
      <div className="modal-box modal w-[800px] h-[500px] relative rounded-lg ">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4  border-inherit">
          <span
            className="close absolute top-4 right-2 cursor-pointer"
            onClick={() => dispatch(boxAction.showBox(true))}
          >
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">Add New Question</h1>
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
              {field.type === "file" ? (
                <>
                  {!formData[`${field.field}Preview`] && (
                    <label className=" cursor-pointer  flex items-center justify-center ">
                      <div className="rounded-md flex flex-col gap-1  w-full items-center justify-center border-dashed border ">
                        <h1>upload image</h1> <MdImage size={25} />
                      </div>
                      <input
                        type="file"
                        className=" hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(field.field, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                  {formData[`${field.field}Preview`] && (
                    <div className="label-with-input relative">
                      <img
                        src={formData[`${field.field}Preview`]}
                        alt={`${field.label} Preview`}
                        className="w-full object-cover h-[100px]"
                      />
                      <div
                        onClick={(e) => {
                          handleRemoveImage(field.field);
                        }}
                        className="absolute font-extrabold  cursor-pointer right-1 top-1  h-[30px] w-[30px] bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <MdClose/>
                      </div>
                    </div>
                  )}
                </>
              ) : field.type === "select" ? (
                <select
                  value={formData[field.field]}
                  onChange={(e) => handleChange(field.field, e.target.value)}
                  className="form-select"
                >
                  {field.field === "questionCategory" &&
                    props.questionCategory.map((item) => (
                      <option key={item.id}>{item.title}</option>
                    ))}
                  {field.field === "answer" &&
                    questionFormFields
                      .filter((field) => field.group === "option")
                      .map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                      ))}

                  {field.field === "questionCategory" &&
                    props.questionCategory.map((item) => (
                      <option key={item.id}>{item.title}</option>
                    ))}
                </select>
              ) : (
                <textarea
                  className="col-span-2 form-input"
                  value={formData[field.field]}
                  onChange={(e) => handleChange(field.field, e.target.value)}
                  rows={3}
                />
              )}

              {errors[field.field] && (
                <p style={{ color: "red" }}>{errors[field.field]}</p>
              )}
            </div>
          ))}
          <div className="form-btn-div">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="submit" className="remove-btn">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
