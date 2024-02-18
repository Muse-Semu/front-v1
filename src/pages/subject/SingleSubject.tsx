import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "../../api/APIService";
import { slugs } from "../../constant";
import { columns } from "./columns";
import UpdateSubject from "./UpdateSubject";

function SingleSubject() {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleSubject, setSingleSubject] = useState();
  // console.log(id);

  useEffect(() => {
    getSubjectById(id).then((res) => {
      setSingleSubject(res.data);
    });
  }, []);

  return (
    <div>
      <div>
        {/* {singleExam && (<Single data = {singleExam} slug={slugs.EXAM}/>)} */}
        <div>
          <div>
            <div className="header"> Subject Information </div>
            {singleSubject && (
              <div className="box-c">
                <div>
                  <h1>{singleSubject.title}</h1>
                </div>
                <div>{/* <h1>{singleSubject.Subject.title}</h1> */}</div>
                <div>
                  <h1>{singleSubject.description}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="edit-btn" onClick={() => setEditBox(true)}>
                    Update
                  </button>
                  <button className="normal-btn hover-c"> View Chapters</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editBox && (
        <UpdateSubject
          editableSubject={singleSubject}
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
