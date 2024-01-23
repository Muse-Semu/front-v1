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
  }, []);

  return (
    <div>
      <div>
        <div className="header"> Exam Information </div>
        {singleExamCategory && (
          <div>
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
              <button className="" onClick={() => setEditBox(true)}>
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
