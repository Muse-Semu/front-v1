import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "../../api/APIService";
import { slugs } from "../../constant";
import { columns } from "./columns";
import Update from "../../components/crud/Update";

function SingleSubject() {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleSubject, setSingleSubject] = useState();
  // console.log(id);

  useEffect(() => {
    getSubjectById(id).then((res) => {
      console.log(res.data);
      setSingleSubject(res.data);
    });
  }, []);

  return (
    <div>
      <div>
        {/* {singleExam && (<Single data = {singleExam} slug={slugs.EXAM}/>)} */}
        <div>
          <div>
            <div className="header"> Exam Information </div>
            {singleSubject && (
              <div>
                <div>
                  <h1>
                    {singleSubject.title} {singleSubject.id}
                  </h1>
                </div>
                <div>{/* <h1>{singleSubject.Subject.title}</h1> */}</div>
                <div>
                  <h1>{singleSubject.description}</h1>
                </div>
                <div>
                  <button className="" onClick={() => setEditBox(true)}>
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editBox && (
        <Update
          editableExam={singleSubject}
          title={singleSubject.title}
          slug={slugs.SUBJECT}
          columns={columns}
          setEditBox={setEditBox}
        />
      )}
    </div>
  );
}

export default SingleSubject;
