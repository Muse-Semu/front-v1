import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectById, getSubjectChapter } from "../../api/subjectsApi";
import { slugs } from "../../constant";
import { columns } from "./columns";
import UpdateSubject from "./UpdateSubject";
import { MdArrowBack } from "react-icons/md";
import { CircleFadingPlus, Edit, Plus } from "lucide-react";
import { Chapter } from "./chapters/Chapter";
import { title } from "process";
interface SingleSubject {
  id: number;
  title: string;
  description: string;
}

interface Chapter {
  id: number;
  title: string;
  chapter: number;
  grade: number;
  subject: {
    id: number;
    title: string;
  };
}
function SingleSubject() {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleSubject, setSingleSubject] = useState<SingleSubject>();
  const [chapters, setChapters] = useState<Chapter[]>();
  const navigate = useNavigate();
  useEffect(() => {
    getSubjectById(id).then((res) => {
      setSingleSubject(res.data);
    });

   
  }, []);

  useEffect(()=>{
     getSubjectChapter(id).then((res) => {
       setChapters(res.data);
     });
  },[])

  return (
    <div>
      <div className="header  ">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="header-txt">
              {singleSubject && singleSubject.title}
            </h1>
            <p className="desc">{singleSubject?.description}</p>
          </div>
          <div>
            <button className="flex gap-2 " onClick={() => setEditBox(true)}>
              <Edit />
            </button>
          </div>

          {singleSubject && (
            <Chapter
              chapter={{
                grade: null,
                title: "",
                chapter: null,
                subject: singleSubject,
              }}
              type = "new"
            />
          )}
        </div>
        <div className="cursor-pointer">
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="p-2">
        {singleSubject && (
          <div className="box-c p-2">
            <div>
              <h1>Chapters</h1>
            </div>
            <div>{/* <h1>{singleSubject.Subject.title}</h1> */}</div>
            {chapters &&
              chapters.map((chap: Chapter) => (
                <div key={chap.id}>
                  <div>
                    <div className="nrm-header">
                      <h3>Grade : {chap.grade}</h3>
                      <Chapter
                        chapter={{
                          grade: chap.grade,
                          title: "",
                          chapter: null,
                          subject: chap.subject,
                        }}
                        type="onSubject"
                      />
                    </div>

                    <div className="px-3">
                      <div className="flex items-center justify-start p-1 gap-2">
                        <h3>
                          {" "}
                          Chapter {chap.chapter} - {chap.title}
                        </h3>
                        <button>
                          <Chapter chapter={chap} type="edit" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {editBox && (
        <UpdateSubject
          id={id}
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
