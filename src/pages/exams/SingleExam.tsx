import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../api/APIService";
import { slugs } from "../../constant";
import { columns } from "./columns";
import UpdateExam from "./UpdateExam";
type SingleExam ={
  id: number;
  title: string;
  givenTime: number;
  examCategory: {
    id: number;
    title: string;
  };
  subject: {
    id: number;
    title: string;
  };
}



function SingleExam() {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleExam, setSingleExam] = useState<SingleExam | any>();
  const navigate = useNavigate();
  useEffect(() => {
    getExamById(id).then((res) => {
      setSingleExam(res.data);
    });
  }, [singleExam]);
  return (
    <div>
      <div>
        {/* {singleExam && (<Single data = {singleExam} slug={slugs.EXAM}/>)} */}
        <div>
          <div>
            <div className="header"> Exam Information </div>
            {singleExam && (
              <div className="box-c">
                <div>
                  <h1>
                    {singleExam.title} {singleExam.id}
                  </h1>
                </div>
                <div>
                  <h1>{singleExam.examCategory.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                  <label htmlFor="">Given Time : </label>
                  <h1 className="font-bold text-lg">{singleExam.givenTime}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="edit-btn" onClick={() => setEditBox(true)}>
                    Update
                  </button>

                  <button
                    className="normal-btn hover-c"
                    onClick={(e) =>
                      navigate(`/${slugs.EXAM}/${id}/${slugs.QUESTION}`)
                    }
                  >
                    {" "}
                    View Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editBox && (
        <UpdateExam
          id={id}
          editableExam={singleExam}
          title={ singleExam.title}
          slug={slugs.EXAM}
          columns={columns}
          setEditBox={setEditBox}
        />
      )}
    </div>
  );
}

export default SingleExam;
