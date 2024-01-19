import { useEffect, useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { getExamById, getExamCategory, getExams, getSubject } from "../../api/APIService";
import { useSelector } from "react-redux";
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
    field: "givenTime",
    type: "number",
    headerName: "Given Time",
    width: 100,
  },
  {
    field: "examYear",
    type: "number",
    headerName: "Exam Year",
    width: 100,
  },
  {
    field: "examCategory",
    headerName: "Category",
    type: "number",
    width: 200,
    renderCell: (params) => {
      const category = params.row.examCategory;
      return category ? category.title : "-";
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    type: "number",
    width: 200,
    renderCell: (params) => {
      const subject = params.row.subject;
      return subject ? subject.title : "-";
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "active",
    headerName: "Is Active",
    width: 100,
    type: "boolean",
  },
  {
    field: "description",
    headerName: "Desciption",
    width: 0,
    type: "string",
  },
];

const otherfields = [{
  image:'image',
  headerName:"Image",
  placeholder:"upload image here",
  type:"file",
}]

function Exams() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    exams: [],
    examCategory: [],
    subject: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [exams, examCategory, subject] = await Promise.all([
        getExams(),
        getExamCategory(),
        getSubject(),
      ]);
      setData({ exams, examCategory, subject });
      setIsLoading(false);
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const box = useSelector((state) => state.box.isOpen);
  // console.log(box);
  return (
    <div className="products ">
      <div className="header ">
        <h1 className="header-txt">Exams</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Exam
        </button>
      </div>

      {/* <DataTable slug="products" columns={columns} rows={exams} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        <Loading />
      ) : data.exams.length != 0 ? (
        <DataTable slug="exams" columns={columns} rows={data.exams} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}
      {open && (
        <Add
          slug="Exam"
          subject={data.subject}
          examCategory={data.examCategory}
          columns={columns}
          otherFields = {otherfields}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}



export default Exams;
