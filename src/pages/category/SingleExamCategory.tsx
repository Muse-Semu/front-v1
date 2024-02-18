import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamCategoryById } from "../../api/APIService";
import { slugs } from "../../constant";
import { columns } from "./columns";
import UpdateExamCategory from "./UpdateExamCategory";

function SingleExamCategory() {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleExamCategory, setSingleExamCategory] = useState();
  // console.log(id);

  useEffect(() => {
    getExamCategoryById(id).then((res) => {
      setSingleExamCategory(res.data);
    });
  }, [singleExamCategory]);

  return (
    <div className="">
      <div className="grid gap-3">
        <div className="header p-3 "> Exam Category Information </div>
        {singleExamCategory && (
          <div className="box-c">
            <div>
              <h1>
                {singleExamCategory.title} {singleExamCategory.id}
              </h1>
            </div>
            <div>{/* <h1>{singleExamCategory.examCategory.title}</h1> */}</div>
            <div>
              <h1>{singleExamCategory.description}</h1>
            </div>
            <div>
              <button className="edit-btn" onClick={() => setEditBox(true)}>
                Update
              </button>
            </div>
            <div>
              {editBox && (
                <UpdateExamCategory
                  id={singleExamCategory.id}
                  title={singleExamCategory.title}
                  slug={slugs.EXAM_CATEGORY}
                  columns={columns}
                  setEditBox={setEditBox}
                  editbaleExamCategory={singleExamCategory}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleExamCategory;
