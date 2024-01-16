import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { getSubject, getSubjectById } from "../../api/APIService";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 10 },
  // {
  //   field: "img",
  //   headerName: "Image",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },

  {
    field: "description",
    headerName: "Desciption",
    width: 200,
    type: "string",
  },
];

function Subjects() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);

  // const sub = useSelector((state)=>state.exam.subject)

  useEffect(() => {
    // dispatch(examAction.fetchSubject(sub));
    getSubject().then((res) => {
      setSubject(res);
      setLoading(false);
    });
    setTimeout(()=>{setLoading(false)},5000)
  }, []);

  const box = useSelector((state) => state.box.isOpen);
  // console.log(box,sub);
  return (
    <div className="products ">
      <div className="header">
        <h1 className="header-txt">Subject</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Subject
        </button>
      </div>

      {/* <DataTable slug="products" columns={columns} rows={subject} /> */}
      {/* TEST THE API */}

      {loading ? (
        <Loading />
      ) : ( subject.length != 0 ?
        <DataTable slug="subject" columns={columns} rows={subject} />:(
          <>Error</>
        )
      )}

      {open && (
        <Add slug="subject"  columns={columns} setOpen={setOpen} />
      )}
    </div>
  );
}

export const SingleSubject = ()=>{
  const {id} = useParams()
 
  const [singleSubject,setSingleSubject] = useState()
  useEffect(()=>{
    getSubjectById(id).then((res)=>{
      setSingleSubject(res)
    })
  })
  return <div>
    <div>
     { singleSubject}
    </div>
  </div>
}

export default Subjects;
