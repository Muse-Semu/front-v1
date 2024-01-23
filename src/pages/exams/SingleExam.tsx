import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamById } from "../../api/APIService";
import { slugs } from "../../constant";
import Update from "../../components/crud/Update";
import { columns } from "./columns";
import UpdateExam from "./UpdateExam";

function SingleExam() {
  const { id } = useParams();
  const [editBox,setEditBox] = useState(false)
  const [singleExam, setSingleExam] = useState();
  // console.log(id);

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

// export const SingleExam = () => {
//   const { id } = useParams();

//   const [singleExam, setSingleExam] = useState();
//   // console.log(id);

//   useEffect(() => {
//     getExamById(id).then((res) => {
//       console.log(res.data);
//       setSingleExam(res.data);
//     });
//   }, []);
//   return (
//     <div>
//       <div>
//         {singleExam && (
//           <div>
//             <h1>{singleExam.title}</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// {
//   singleExam && (
//     <div>
//       <div className="header">
//         <h1>{singleExam.title}</h1>
//       </div>
//       <div className=" border">
//         {" "}
//         <div>
//           <h1>{singleExam.subject.title}</h1>
//           <h1>{singleExam.examCategory.title}</h1>
//         </div>
//         <div>
//           <h1>{singleExam.description}</h1>
//           <h1>{singleExam.givenTime}</h1>
//           <h1>{singleExam.createdAt}</h1>
//           <h1 className="">{singleExam.active ? <>true</> : <>False</>}</h1>
//           <h1>{singleExam.examYear}</h1>
//         </div>
//       </div>
//     </div>
//   );
// }
