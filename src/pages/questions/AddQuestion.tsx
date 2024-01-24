import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { questionFormFields } from "./columns";

const AddQuestion = (props) => {
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    content: "",
    questionImage: null,
    answerImage: null,
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

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  }

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
          <h1 className=" text-2xl font-extrabold">Add New Question</h1>
        </div>
        <form className="grid lg:grid-cols-2 gap-4 p-4" onSubmit={handleSubmit}>
          {questionFormFields.map((fieldConfig) => (
            <div className="grid gap-2" key={fieldConfig.field}>
              <label className="form-label" htmlFor={fieldConfig.field}>
                {fieldConfig.label}:
              </label>
              {fieldConfig.type === "file" ? (
                <input 
                  type="file"
                  id={fieldConfig.field}
                  onChange={(e) =>
                    handleInputChange(fieldConfig.field, e.target.files[0])
                  }
                />
              ) : fieldConfig.type === "text-array" ? (
                // Render text inputs for array fields (e.g., options)
                fieldConfig.options.map((option, index) => (
                  <input
                    className="form-input"
                    key={index}
                    type="text"
                    value={formData[fieldConfig.field][index]}
                    onChange={(e) =>
                      handleOptionChange(
                        fieldConfig.field,
                        index,
                        e.target.value
                      )
                    }
                  />
                ))
              ) : fieldConfig.type === "select" ? (
                // Render dropdowns for select fields (e.g., exam, questionCategory)
                // You can fetch and populate options dynamically
                <select
                  id={fieldConfig.field}
                  value={formData[fieldConfig.field]}
                  onChange={(e) =>
                    handleInputChange(fieldConfig.field, e.target.value)
                  }
                  className="form-select"
                >
                  {/* Options go here */}
                </select>
              ) : (
                // Render regular text inputs
                <input
                  type={fieldConfig.type}
                  id={fieldConfig.field}
                  value={formData[fieldConfig.field]}
                  onChange={(e) =>
                    handleInputChange(fieldConfig.field, e.target.value)
                  }
                  maxLength={fieldConfig.maxLength}
                  className="form-input"
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;

{
  /*  */
}
