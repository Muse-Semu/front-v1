import { Reducer, useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/crud/Add";
import { GridColDef } from "@mui/x-data-grid";
import { getSubject, getSubjectById } from "../../api/APIService";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { slugs } from "../../constant";
import { columns } from "./columns";



function Subjects() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const subject  = useSelector((state)=>state.exam.subject);
  const [loading, setLoading] = useState(false);


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
        <DataTable slug={slugs.SUBJECT} columns={columns} rows={subject} />:(
          <>Error</>
        )
      )}

      {open && (
        <Add slug={slugs.SUBJECT} columns={columns} setOpen={setOpen} />
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
