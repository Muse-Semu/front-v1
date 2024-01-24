import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../api/APIService";
import { slugs } from "../../constant";
import Update from "../../components/crud/Update";
import { columns } from "./columns";
import UpdateExam from "./UpdateExam";

function SingleExam() {
  const { id } = useParams();
  const [editBox,setEditBox] = useState(false)
  const [singleExam, setSingleExam] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    getExamById(id).then((res) => {
      setSingleExam(res.data);
    });
  }, []);
  return (
    <div>
      <div>
        {/* {singleExam && (<Single data = {singleExam} slug={slugs.EXAM}/>)} */}
        <div>
          <div>
            <div className="header"> Exam Information </div>
            {singleExam && (
              <div>
                <div>
                  <h1>
                    {singleExam.title} {singleExam.id}
                  </h1>
                </div>
                <div>
                  <h1>{singleExam.examCategory.title}</h1>
                </div>
                <div>
                  <h1>{singleExam.givenTime}</h1>
                </div>
                <div>
                  <button className="" onClick={() => setEditBox(true)}>
                    Update
                  </button>
                  <button type="" onClick={(e)=>navigate(`/${slugs.EXAM}/${id}/${slugs.QUESTION}`)}> View Question</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editBox && <UpdateExam id={id} editableExam = {singleExam} title={singleExam.title} slug={slugs.EXAM} columns={columns} setEditBox={setEditBox} />}
    </div>
  );
}

export default SingleExam;

