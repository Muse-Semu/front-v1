import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamCategoryById } from "../../api/APIService";
import { slugs } from "../../constant";
import { columns } from "./columns";
import UpdateExamCategory from "./UpdateExamCategory";
import { MdArrowBack } from "react-icons/md";
interface SingleExamCategory {
  id: number;
  title: string;
  description: string;
}
function SingleExamCategory() {
  const { id } = useParams<any>();
  const [editBox, setEditBox] = useState(false);
  const [singleExamCategory, setSingleExamCategory] =
    useState<SingleExamCategory>();
  const navigate =useNavigate()

  useEffect(() => {
    getExamCategoryById(id).then((res) => {
      setSingleExamCategory(res.data);
    });
  }, [singleExamCategory]);

  return (
    <div className="">
      <div className="header  ">
        <div className="flex items-center gap-2">
          <h1 className="header-txt">
            {singleExamCategory && singleExamCategory.title}
          </h1>
        </div>
        <div className="cursor-pointer">
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="p-2">
        <div className="">
          {singleExamCategory && (
            <div className="box-c">
              <div>
                <h1>
                  {singleExamCategory.title} {singleExamCategory.id}
                </h1>
              </div>
              <div>
                {/* <h1>{singleExamCategory.examCategory.title}</h1> */}
              </div>
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
    </div>
  );
}

export default SingleExamCategory;
